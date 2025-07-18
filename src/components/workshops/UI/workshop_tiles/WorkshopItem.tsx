/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { workshopsFetch } from "@/api/workshops";
import { useNavigate } from "@tanstack/react-router";
import { useToast } from "../../toast";

type Workshop = {
  id: string;
  title: string;
  body: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  maxPlaces: number;
  remainPlaces?: number;
  isActive?: boolean;
  isRegistrable?: boolean;
};

type WorkshopItemProps = {
  workshop: Workshop;
  remove: (workshop: Workshop) => void;
  edit: (workshop: Workshop) => void;
  openDescription: (workshop: Workshop) => void;
  currentUserRole: "user" | "admin";
  refreshParticipants: () => void;
};

const WorkshopItem: React.FC<WorkshopItemProps> = ({
  workshop,
  remove,
  edit,
  openDescription,
  currentUserRole,
  refreshParticipants,
}) => {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const [workshopChosen, setWorkshopChosen] = useState(false);
  {
    /* Стэйт для управления количеством записанных людей */
  }
  const [signedPeople, setSignedPeople] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  // Функция для проверки активности воркшопа
  const isWorkshopActive = () => {
    return workshop.isActive !== false && workshop.isRegistrable !== false;
  };
  // Функция для получения текста статуса неактивности
  const getInactiveStatusText = () => {
    // Проверяем, прошел ли воркшоп
    const now = new Date();
    const workshopDate = new Date(workshop.date);
    const [hours, minutes] = workshop.startTime.split(":").map(Number);
    workshopDate.setHours(hours, minutes, 0, 0);

    if (workshopDate < now) {
      return "Outdated";
    }

    if (workshop.isRegistrable === false && workshop.isActive !== false) {
      // Только isRegistrable false показываем дату и время начала
      return `Inactive due ${formatStartDate(workshop.date)} ${formatTime(workshop.startTime)}`;
    } else {
      // isActive false или оба false просто Inactive
      return "Inactive";
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Проверяем, что клик был не по кнопкам и не по ссылке на комнату
    const target = e.target as HTMLElement;
    if (
      !target.closest("button") &&
      !target.closest('[title="Click to view on map"]')
    ) {
      openDescription(workshop);
    }
  };
  const formatStartDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    // Вычитаем один день
    const previousDay = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    const day = previousDay.getDate().toString().padStart(2, "0");
    const month = (previousDay.getMonth() + 1).toString().padStart(2, "0");
    const year = previousDay.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    return timeString;
  };
  const handleRoomClick = (e: React.MouseEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    if (workshop.room) {
      navigate({
        to: "/maps",
        search: { q: workshop.room },
      });
    }
  };
  useEffect(() => {
    (async () => {
      const { data, error } = await workshopsFetch.GET(`/users/my_checkins`);
      if (!error && Array.isArray(data)) {
        const isCheckedIn = data.some((w) => w.id === workshop.id);
        setWorkshopChosen(isCheckedIn);
      } else {
        setWorkshopChosen(false);
      }

      // Используем remainPlaces из пропсов воркшопа если есть, иначе делаем API запрос
      if (workshop.remainPlaces !== undefined) {
        const signedCount = workshop.maxPlaces - workshop.remainPlaces;
        setSignedPeople(Math.max(0, signedCount));
      } else {
        const { data: checkinsData, error: checkinsError } =
          await workshopsFetch.GET(`/workshops/{workshop_id}/checkins`, {
            params: {
              path: { workshop_id: workshop.id.toString() },
            },
          });

        if (!checkinsError && checkinsData && Array.isArray(checkinsData)) {
          setSignedPeople(checkinsData.length);
        }
      }
    })();
  }, [workshop.id, workshop.remainPlaces, workshop.maxPlaces]);

  const handleCheckIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isLoading) return;

    if (workshop.maxPlaces > 0 && signedPeople >= workshop.maxPlaces) {
      return;
    }

    setIsLoading(true);

    const { error } = await workshopsFetch.POST(
      `/workshops/{workshop_id}/checkin`,
      {
        params: {
          path: { workshop_id: workshop.id.toString() },
        },
      },
    );

    if (!error) {
      setWorkshopChosen(true);
      setSignedPeople((count) => count + 1);
      refreshParticipants();
      showSuccess(
        "Check-in Successful",
        "You have successfully checked-in for this workshop.",
      );
    } else {
      showError(
        "Check-in Failed",
        "Failed to check in. Please try again. Probably you have overlapping workshops",
      );
    }

    setIsLoading(false);
  };

  const handleCheckOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);

    const { error } = await workshopsFetch.POST(
      `/workshops/{workshop_id}/checkout`,
      {
        params: {
          path: { workshop_id: workshop.id.toString() },
        },
      },
    );

    if (!error) {
      setWorkshopChosen(false);
      setSignedPeople((count) => Math.max(0, count - 1));
      refreshParticipants();
      showSuccess(
        "Check-out Successful",
        "You have successfully checked-out from this workshop.",
      );
    } else {
      showError("Check-out Failed", "Failed to check out. Please try again.");
    }

    setIsLoading(false);
  };
  return (
    <div
      className={`relative w-full rounded-lg border bg-primary p-2.5 pb-[38px] shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] sm:rounded-2xl sm:p-4 sm:pb-[55px] ${isWorkshopActive() ? "hover:-translate-y-1 hover:transform hover:shadow-[0_8px_24px_rgba(120,0,255,0.3)]" : "border-brand-violet/15"} ${workshopChosen ? "border-green-700/60 bg-gradient-to-br from-green-600/20 to-green-700/10 shadow-[0_4px_16px_rgba(76,175,80,0.1)] hover:shadow-[0_8px_24px_rgba(76,175,80,0.4)] dark:border-green-500/60 dark:from-green-500/10 dark:to-green-500/5" : "border-brand-violet/40"} `}
      onClick={handleContentClick}
    >
      <div className="flex items-center justify-between">
        {workshop.startTime && workshop.endTime && (
          <p
            className={`flex items-center justify-start text-xs font-medium text-brand-violet sm:text-[15px] ${!isWorkshopActive() ? "opacity-50" : ""}`}
          >
            {formatTime(workshop.startTime)} - {formatTime(workshop.endTime)}
          </p>
        )}
        <p
          className={`flex items-center justify-end text-xs font-medium text-brand-violet sm:text-[15px] ${!isWorkshopActive() ? "opacity-50" : ""}`}
        >
          {workshop.maxPlaces >= 0
            ? workshop.maxPlaces === 500
              ? signedPeople + "/"
              : signedPeople + "/" + workshop.maxPlaces
            : "No limit on number of people"}
          {workshop.maxPlaces === 500 && (
            <span className="icon-[mdi--infinity] mt-0.5"></span>
          )}
        </p>
      </div>
      <h3
        className={`my-0.5 mb-1 overflow-hidden break-words text-sm font-semibold leading-[1.2] text-contrast sm:my-1.5 sm:mb-2 sm:text-lg sm:leading-[1.3] ${!isWorkshopActive() ? "opacity-50" : ""}`}
      >
        {workshop.title}
      </h3>
      {!isWorkshopActive() && (
        <p
          className={`pointer-events-none absolute bottom-1.5 left-1/2 z-[1] max-w-[calc(100%-12px)] -translate-x-1/2 transform rounded-md border border-[rgba(255,107,107,0.3)] bg-[rgba(255,107,107,0.15)] text-center font-medium leading-normal text-[#ff6b6b] backdrop-blur-[8px] dark:border-[rgba(255,107,107,0.3)] dark:bg-[rgba(255,107,107,0.15)] sm:rounded-xl ${getInactiveStatusText().startsWith("Inactive due") ? "px-1 py-1 text-[10px] sm:bottom-3 sm:px-2 sm:py-1.5 sm:text-sm" : "px-1.5 py-[5px] text-xs sm:bottom-3 sm:px-4 sm:py-2.5 sm:text-sm"}`}
        >
          {getInactiveStatusText()}
        </p>
      )}
      {workshop.room && (
        <div
          className={`my-1 sm:my-2 ${!isWorkshopActive() ? "opacity-50" : ""}`}
        >
          <p className="m-0 text-xs text-contrast/80 sm:text-base">
            <strong>Room:</strong>{" "}
            <span
              onClick={handleRoomClick}
              className="relative z-[5] cursor-pointer text-brand-violet underline hover:text-brand-violet/80"
              title="Click to view on map"
            >
              {workshop.room}
            </span>
          </p>
        </div>
      )}
      {/* Кликабельная область */}
      <div className="absolute bottom-0 left-0 right-0 top-0 z-0 cursor-pointer"></div>
      {/* Показываем кнопки управления только для администраторов */}
      {currentUserRole === "admin" && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              remove(workshop);
            }}
            className="absolute bottom-1.5 right-1.5 z-[5] flex cursor-pointer items-center justify-center rounded-md border border-[#ff6b6b]/20 bg-primary/80 p-1.5 text-[#ff6b6b] backdrop-blur-[12px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 hover:border-[#ff5252]/40 hover:bg-[rgba(255,107,107,0.2)] hover:text-[#ff5252] sm:bottom-3 sm:right-3 sm:rounded-xl sm:p-2.5"
            title="Delete workshop"
          >
            <span className="icon-[material-symbols--delete-outline-rounded] text-base sm:text-xl" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              edit(workshop);
            }}
            className="absolute bottom-1.5 left-1.5 z-[5] flex cursor-pointer items-center justify-center rounded-md border border-brand-violet/20 bg-primary/80 p-1.5 text-brand-violet backdrop-blur-[12px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-110 hover:border-brand-violet/40 hover:bg-brand-violet/20 hover:text-brand-violet/80 sm:bottom-3 sm:left-3 sm:rounded-xl sm:p-2.5"
            title="Edit workshop"
          >
            <span className="icon-[mynaui--pencil] text-base sm:text-xl" />
          </button>
        </>
      )}
      {/* Показываем кнопки записи только для активных воркшопов */}
      {isWorkshopActive() &&
        (workshopChosen ? (
          <button
            onClick={handleCheckOut}
            disabled={isLoading}
            className="absolute bottom-1.5 right-1/2 flex translate-x-1/2 transform cursor-pointer items-center justify-center rounded-md border border-[#ff6b6b]/20 bg-primary/80 p-1.5 text-[#ff6b6b] backdrop-blur-[12px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-1/2 hover:scale-110 hover:transform hover:border-[#ff5252]/40 hover:bg-[rgba(255,107,107,0.2)] hover:text-[#ff5252] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 sm:bottom-3 sm:rounded-xl sm:p-2.5"
            title="Check out"
          >
            <span className="text-xs font-medium sm:text-sm">Check out</span>
          </button>
        ) : (
          <button
            disabled={signedPeople === workshop.maxPlaces || isLoading}
            onClick={handleCheckIn}
            className="absolute bottom-1.5 right-1/2 flex translate-x-1/2 transform cursor-pointer items-center justify-center rounded-md border border-green-700/30 bg-primary/80 p-1.5 text-green-700 backdrop-blur-[12px] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] hover:translate-x-1/2 hover:scale-110 hover:transform hover:border-green-600/50 hover:bg-green-600/20 hover:text-green-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 dark:border-[#bcdfbc]/20 dark:text-[#bcdfbc] dark:hover:border-[#aad6aa]/40 dark:hover:bg-[rgba(167,202,167,0.2)] dark:hover:text-[#aad6aa] sm:bottom-3 sm:rounded-xl sm:p-2.5"
            title="Check in"
          >
            <span className="text-xs font-medium sm:text-sm">Check in</span>
          </button>
        ))}
    </div>
  );
};

export default WorkshopItem;

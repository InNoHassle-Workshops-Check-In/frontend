export function DormsPage() {
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      <div className="flex flex-col gap-4">
        <div className="group flex flex-row gap-4 rounded-2xl bg-primary px-4 py-6">
          <div className="w-12">
            <span className="icon-[material-symbols--quick-reference-outline-rounded] text-5xl text-brand-violet" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center text-2xl font-semibold text-contrast">
              What is it?
            </p>
            <p className="text-lg text-contrast/75">
              InNoHassle Dorms bot is a tool for managing tasks, duties, and
              rules in your dormitory room. It helps you to split duties between
              roommates and track them.
            </p>
            <p className="flex items-center text-2xl font-semibold text-contrast">
              Features:
            </p>
            <p className="text-lg text-contrast">
              ✉️{" "}
              <span className="text-contrast/75">
                Invite your roommates to join the room
              </span>
            </p>
            <p className="text-lg text-contrast">
              📅{" "}
              <span className="text-contrast/75">
                Create regular or manual tasks
              </span>
            </p>
            <p className="text-lg text-contrast">
              📜{" "}
              <span className="text-contrast/75">
                Define rules for your room
              </span>
            </p>
          </div>
        </div>
        <a
          href="https://t.me/IURoomsBot"
          target="_blank"
          className="group flex flex-row gap-4 rounded-2xl bg-primary px-4 py-6 hover:bg-secondary"
        >
          <div className="w-12">
            <span className="icon-[mdi--robot-excited-outline] text-5xl text-brand-violet" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center text-2xl font-semibold text-contrast">
              Telegram bot
              <span className="icon-[material-symbols--open-in-new-rounded] ml-1" />
            </p>
            <p className="text-lg text-contrast/75">
              Create your room in the bot and invite your roommates to join.
            </p>
          </div>
        </a>
        <a
          href="https://t.me/maximf3"
          target="_blank"
          className="group flex flex-row gap-4 rounded-2xl bg-primary px-4 py-6 hover:bg-secondary"
        >
          <div className="w-12">
            <span className="icon-[ic--baseline-telegram] text-5xl text-brand-violet" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="flex items-center text-2xl font-semibold text-contrast">
              Contact us
              <span className="icon-[material-symbols--open-in-new-rounded] ml-1" />
            </p>
            <p className="text-lg text-contrast/75">
              If you have any questions or suggestions, feel free to contact the
              developers.
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

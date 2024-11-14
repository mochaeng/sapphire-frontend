import { Input } from "../ui/input";

function AuthPanel() {
  return (
    <div className="flex w-full items-center justify-center bg-blue-400">
      <div className="grid w-full max-w-[1080px] grid-cols-1 gap-6">
        <section className="flex justify-center">
          <div className="max-w-authForm w-full">
            <p className="text-4xl">Sapphire</p>
            <p className="text-2xl">Community with Purpose</p>
          </div>
        </section>
        <section className="flex justify-center">
          <div className="max-w-authForm w-full">
            <p className="mb-4 font-semibold">Log in</p>
            <form className="flex flex-col gap-2">
              <div>
                <label htmlFor="email">Email</label>
                <Input name="email" type="email" />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <Input name="password" type="password" />
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AuthPanel;

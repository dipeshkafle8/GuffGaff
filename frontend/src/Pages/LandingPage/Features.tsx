import { Zap, Shield, Users } from "lucide-react";
const Features = () => {
  return (
    <>
      <section className="mt-52 w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-5xl">
                Powerful Features
              </h2>
              <p className="max-w-[900px] text-gray-300 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Everything you need for seamless communication
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-6 flex flex-col items-center space-y-4">
              <div className="rounded-full bg-purple-500/20 p-3">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Real-time Chat</h3>
              <p className="text-center text-gray-300">
                Instant messaging with real-time updates and notifications
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-6 flex flex-col items-center space-y-4">
              <div className="rounded-full bg-purple-500/20 p-3">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Secure</h3>
              <p className="text-center text-gray-300">
                End-to-end encryption keeps your conversations private
              </p>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-6 flex flex-col items-center space-y-4">
              <div className="rounded-full bg-purple-500/20 p-3">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Team Friendly</h3>
              <p className="text-center text-gray-300">
                Perfect for teams of any size with group chat support
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Features;

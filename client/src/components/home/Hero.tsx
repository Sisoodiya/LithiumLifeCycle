import { Link } from "wouter";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-primary-700 to-primary-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <div className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-grey sm:text-5xl md:text-6xl">
                <span className="block">Recycling Lithium-ion</span>
                <span className="block text-accent-400">Batteries for a Greener Future</span>
              </h1>
              <p className="mt-3 text-base text-black-100 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Join our mission to reduce e-waste and promote sustainable energy usage through battery recycling and reuse.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link href="/sell-battery">
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-gery bg-accent-500 hover:bg-accent-600 md:py-4 md:text-lg md:px-10">
                      Sell Your Battery
                    </a>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link href="/marketplace">
                    <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-700 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10">
                      Browse Marketplace
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1593941707882-a5bba53aaf95?ixlib=rb-1.2.1&auto=format&fit=crop&q=80"
          alt="Electric vehicle battery recycling"
        />
      </div>
    </div>
  );
};

export default Hero;

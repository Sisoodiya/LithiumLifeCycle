import SubsidyCards from "../components/subsidies/SubsidyCards";
import SubsidyFinder from "../components/subsidies/SubsidyFinder";

const Subsidies = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Government Subsidies & Programs</h2>
          <p className="mt-4 text-lg text-gray-600">
            Stay informed about available government support for EV adoption and battery recycling.
          </p>
        </div>

        <SubsidyCards />
        <SubsidyFinder />
      </div>
    </section>
  );
};

export default Subsidies;

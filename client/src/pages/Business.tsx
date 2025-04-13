import BusinessTabs from "../components/business/BusinessTabs";

const Business = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Business Solutions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprehensive battery recycling and procurement services for businesses.
          </p>
        </div>

        <div className="mt-12">
          <BusinessTabs />
        </div>
      </div>
    </section>
  );
};

export default Business;

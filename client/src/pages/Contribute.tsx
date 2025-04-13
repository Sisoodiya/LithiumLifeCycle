import ContributionForm from "../components/contribute/ContributionForm";
import IdeasShowcase from "../components/contribute/IdeasShowcase";

const Contribute = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Join Our Mission</h2>
          <p className="mt-4 text-lg text-gray-600">
            NGOs, companies, and individuals can contribute to our sustainability initiatives.
          </p>
        </div>

        <div className="mt-12 md:flex md:space-x-8">
          {/* Contribution Form */}
          <div className="md:w-1/2">
            <ContributionForm />
          </div>

          {/* Ideas Showcase */}
          <div className="mt-8 md:mt-0 md:w-1/2">
            <IdeasShowcase />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contribute;

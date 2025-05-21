"use client";
import { useRouter } from "next/navigation";
import CompanyCard from "./CompanyCard";

const companies = [
    { name: "Amazon", logoUrl: "https://logo.clearbit.com/amazon.com" },
    { name: "Google", logoUrl: "https://logo.clearbit.com/google.com" },
    { name: "Microsoft", logoUrl: "https://logo.clearbit.com/microsoft.com" },
    { name: "Netflix", logoUrl: "https://logo.clearbit.com/netflix.com" },
    { name: "Meta", logoUrl: "https://logo.clearbit.com/meta.com" },
    { name: "Adobe", logoUrl: "https://logo.clearbit.com/adobe.com" },
    { name: "Tesla", logoUrl: "https://logo.clearbit.com/tesla.com" },
    { name: "SpaceX", logoUrl: "https://logo.clearbit.com/spacex.com" },
    { name: "NVIDIA", logoUrl: "https://logo.clearbit.com/nvidia.com" },
    { name: "Stripe", logoUrl: "https://logo.clearbit.com/stripe.com" },
    { name: "Github", logoUrl: "https://logo.clearbit.com/Github.com" },
    { name: "Snapchat", logoUrl: "https://logo.clearbit.com/snapchat.com" },
  ];
  

export default function TopCompanies() {
  const router = useRouter();

  const handleClick = (companyName: string) => {
    const slug = companyName.toLowerCase().replace(/\s+/g, "-");
    router.push(`/${slug}`);
  };

  return (
    <section className="bg-[#101820] text-[#E0E0E0] py-16 px-0 pt-0">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-6">Top Companies</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 justify-items-center">
          {companies.map((company, index) => (
            <CompanyCard
              key={index}
              name={company.name}
              logoUrl={company.logoUrl}
              onClick={() => handleClick(company.name)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
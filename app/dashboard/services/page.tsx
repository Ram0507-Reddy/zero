import ServiceCard from "@/components/ServiceCard";
import { getAllServices } from "@/lib/services";

export const revalidate = 0; // Dynamic

export default async function ServicesPage() {
    const services = await getAllServices();

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4">AVAILABLE MODULES</h1>
                <p className="text-gray-400">Select a module to deploy to your infrastructure.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.length > 0 ? (
                    services.map((service) => (
                        <ServiceCard key={service.slug} service={service} />
                    ))
                ) : (
                    <p className="text-gray-500 italic">No services online.</p>
                )}
            </div>
        </div>
    );
}

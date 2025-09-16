import React, { useState, useEffect } from 'react';
import type { Resource, ResourceCategory, ResourceType } from '../types';
import FileTextIcon from '../components/icons/FileTextIcon';
import PlayIcon from '../components/icons/PlayIcon';
import HeadphoneIcon from '../components/icons/HeadphoneIcon';
import SearchIcon from '../components/icons/SearchIcon';
import ResourceModal from '../components/ResourceModal';

const categories: ResourceCategory[] = ['Stress', 'Anxiety', 'Habits', 'Relationships'];
const API_URL = 'https://raw.githubusercontent.com/ILoveTalk/ILoveTalk/main/websites/sahay/resources.json';

const ResourceTypeIcon: React.FC<{ type: ResourceType }> = ({ type }) => {
    const iconProps = { className: "w-5 h-5" };
    switch (type) {
        case 'article':
            return <FileTextIcon {...iconProps} />;
        case 'video':
            return <PlayIcon {...iconProps} />;
        case 'audio':
            return <HeadphoneIcon {...iconProps} />;
        default:
            return null;
    }
};

const ResourceCard: React.FC<{ resource: Resource; onSelect: () => void }> = ({ resource, onSelect }) => (
    <div className="bg-white/50 rounded-lg shadow-sm overflow-hidden group flex flex-col">
        <div className="relative">
            <img src={resource.imageUrl} alt={resource.title} className="w-full h-48 object-cover" />
            <div className="absolute top-3 right-3 bg-[#FEFAE0]/80 backdrop-blur-sm p-2 rounded-full">
                <ResourceTypeIcon type={resource.type} />
            </div>
        </div>
        <div className="p-6 flex flex-col flex-grow">
            <p className="text-sm font-semibold text-[#A3B18A] mb-1">{resource.category}</p>
            <h3 className="text-xl font-['Poppins'] font-semibold text-[#343A40] mb-2">{resource.title}</h3>
            <p className="text-[#343A40] leading-relaxed flex-grow">{resource.description}</p>
            <button onClick={onSelect} className="inline-block mt-4 font-semibold text-left text-[#343A40] group-hover:text-[#A3B18A] transition-colors">
                View Resource &rarr;
            </button>
        </div>
    </div>
);

const ResourcesPage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<ResourceCategory | 'All'>('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [resources, setResources] = useState<Resource[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

    useEffect(() => {
        const fetchResources = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Resource[] = await response.json();
                setResources(data);
            } catch (err) {
                setError('Could not load resources. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchResources();
    }, []);

    const filteredResources = resources
        .filter(r => activeCategory === 'All' || r.category === activeCategory)
        .filter(r => {
            const term = searchTerm.toLowerCase();
            return r.title.toLowerCase().includes(term) || r.description.toLowerCase().includes(term);
        });

    return (
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-['Poppins'] font-semibold text-[#343A40]">Wellness Hub</h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-[#343A40]">
                    A library of articles, videos, and audio guides to help you feel your best.
                </p>
            </div>
            
            <div className="mb-8 max-w-xl mx-auto">
                 <div className="relative">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search resources by keyword..."
                        className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#A3B18A] focus:border-transparent transition"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <SearchIcon className="w-6 h-6" />
                    </div>
                </div>
            </div>

            <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-12">
                <button 
                    onClick={() => setActiveCategory('All')}
                    className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base ${activeCategory === 'All' ? 'bg-[#A3B18A] text-[#343A40]' : 'bg-white/50 hover:bg-gray-200/50'}`}
                >
                    All
                </button>
                {categories.map(category => (
                    <button 
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm sm:text-base ${activeCategory === category ? 'bg-[#A3B18A] text-[#343A40]' : 'bg-white/50 hover:bg-gray-200/50'}`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {loading && <div className="text-center text-xl font-semibold text-[#343A40]">Loading resources...</div>}
            {error && <div className="text-center text-xl font-semibold text-red-500">{error}</div>}

            {!loading && !error && (
                 <>
                    {filteredResources.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredResources.map(resource => (
                                <ResourceCard key={resource.id} resource={resource} onSelect={() => setSelectedResource(resource)} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-lg text-gray-600 mt-16">
                            <p>No resources found.</p>
                             <p className="text-base mt-2">Try adjusting your search or filters.</p>
                        </div>
                    )}
                </>
            )}

            {selectedResource && (
                <ResourceModal resource={selectedResource} onClose={() => setSelectedResource(null)} />
            )}
        </div>
    );
};

export default ResourcesPage;
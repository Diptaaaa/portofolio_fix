import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '../../Components/Navbar';
import HeroSection from '../../Components/HeroSection';
import CoverFlowCarousel from '../../Components/CoverFlowCarousel';
import CapabilitiesBento from '../../Components/CapabilitiesBento';
import TraitDeck from '../../Components/TraitDeck';
import AwardsCollage from '../../Components/AwardsCollage';
import TrainingsSection from '../../Components/TrainingsSection';
import ContactModal from '../../Components/ContactModal';
import ProjectDetailModal from '../../Components/ProjectDetailModal';
import Footer from '../../Components/Footer';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function Index({
    profile,
    featuredProjects = [],
    archiveProjects = [],
    skills = {},
    traits = [],
    awards = [],
    awardPhotos = [],
    experiences = [],
}) {
    const { flash } = usePage().props;
    const [isContactOpen, setIsContactOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const title = profile?.full_name 
        ? `${profile.full_name} — ${profile.tagline || 'Software Engineer & Junior Data Analyst'}`
        : 'Muhammad Rafli Pradipta — Software Engineer & Data Analyst';

    return (
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
            <Head>
                <title>{title}</title>
                <meta name="description" content={profile?.bio || 'Fullstack Portfolio of Muhammad Rafli Pradipta'} />
            </Head>

            {/* Flash Message Toast Notification */}
            {flash?.success && (
                <div className="fixed bottom-6 right-6 z-50 glass-pill px-4 py-3 rounded-2xl border border-emerald-500/30 text-emerald-400 text-xs font-semibold flex items-center gap-2 shadow-2xl animate-in slide-in-from-bottom-5">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>{flash.success}</span>
                </div>
            )}

            {/* Navigation Bar */}
            <Navbar 
                profile={profile} 
                onOpenContact={() => setIsContactOpen(true)} 
            />

            <main>
                {/* 1. Hero Section (Cutout subject + outline text + parallax) */}
                <HeroSection 
                    profile={profile} 
                    onOpenContact={() => setIsContactOpen(true)} 
                />

                {/* 2. 3D Cover Flow Carousel (Featured Projects) */}
                <CoverFlowCarousel 
                    projects={featuredProjects}
                    onSelectProject={(project) => setSelectedProject(project)}
                />

                {/* 3. Bento Grid (Capabilities & Tech Stack) */}
                <CapabilitiesBento 
                    skills={skills} 
                />

                {/* 4. Interactive Trait Deck (Section About Me) */}
                <TraitDeck 
                    profile={profile}
                    traits={traits} 
                    projectsCount={archiveProjects?.length || 12}
                    awardsCount={awards?.length || 9}
                    onOpenContact={() => setIsContactOpen(true)}
                />

                {/* 5. Recognition & Milestone Journey (Awards & Photo Collage) */}
                <AwardsCollage 
                    awards={awards} 
                    awardPhotos={awardPhotos} 
                />

                {/* 6. Trainings, Workshops & Hackathons (Growth & Experience) */}
                <TrainingsSection 
                    experiences={experiences} 
                />
            </main>

            {/* Footer */}
            <Footer 
                profile={profile} 
                onOpenContact={() => setIsContactOpen(true)} 
            />

            {/* Contact Inquiry Modal */}
            <ContactModal 
                isOpen={isContactOpen} 
                onClose={() => setIsContactOpen(false)} 
                profile={profile} 
            />

            {/* Project Full Preview & Gallery Modal */}
            <ProjectDetailModal 
                project={selectedProject} 
                onClose={() => setSelectedProject(null)} 
            />
        </div>
    );
}

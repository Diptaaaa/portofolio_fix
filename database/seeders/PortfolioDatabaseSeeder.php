<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\Skill;
use App\Models\TraitCard;
use App\Models\Award;
use App\Models\AwardPhoto;
use App\Models\Experience;

class PortfolioDatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Ensure public storage directories exist
        $storagePublic = storage_path('app/public');
        File::ensureDirectoryExists($storagePublic . '/profile');
        File::ensureDirectoryExists($storagePublic . '/projects');
        File::ensureDirectoryExists($storagePublic . '/awards');

        $baseRef = base_path('referensi');

        // Copy Profile Photo Cutout
        $cleanCutoutSource = base_path('public/images/foto_profil_hero_clean.png');
        $profileCutoutSource = File::exists($cleanCutoutSource) ? $cleanCutoutSource : $baseRef . '/foto profil.png';
        $profileCutoutRel = 'profile/foto_profil.png';
        if (File::exists($profileCutoutSource)) {
            File::copy($profileCutoutSource, $storagePublic . '/' . $profileCutoutRel);
        }

        // Copy Project Images
        $projectDirs = [
            'Little Lemon Restaurant (Meta Front-End)' => 'little_lemon',
            'Bumi Arema Tour & Travel (Portal Wisata Jawa Timur)' => 'bumi_arema',
            'Early Warning System Kelulusan Mahasiswa (Power BI  ML Filkom UB)' => 'ews_filkom',
            'Cyclistic Bike-Share (Tableau Dashboard)' => 'cyclistic',
        ];

        $copiedProjectImages = [];

        foreach ($projectDirs as $folderName => $targetSlug) {
            $srcDir = $baseRef . '/1/' . $folderName;
            $destDir = $storagePublic . '/projects/' . $targetSlug;
            File::ensureDirectoryExists($destDir);

            $copiedProjectImages[$targetSlug] = [];

            if (File::isDirectory($srcDir)) {
                $files = File::files($srcDir);
                foreach ($files as $file) {
                    $filename = $file->getFilename();
                    File::copy($file->getRealPath(), $destDir . '/' . $filename);
                    $copiedProjectImages[$targetSlug][] = 'projects/' . $targetSlug . '/' . $filename;
                }
            }
        }

        // Copy Award & Yudisium Photos from referensi/2
        $awardPhotosSourceDir = $baseRef . '/2';
        $copiedAwardPhotos = [];
        if (File::isDirectory($awardPhotosSourceDir)) {
            $files = File::files($awardPhotosSourceDir);
            $idx = 0;
            foreach ($files as $file) {
                $idx++;
                $filename = 'award_' . $idx . '_' . $file->getFilename();
                File::copy($file->getRealPath(), $storagePublic . '/awards/' . $filename);
                $copiedAwardPhotos[] = [
                    'path' => 'awards/' . $filename,
                    'original' => $file->getFilename(),
                ];
            }
        }

        // 2. Admin User
        User::updateOrCreate(
            ['email' => 'admin@rafli.dev'],
            [
                'name' => 'Muhammad Rafli Pradipta',
                'password' => Hash::make('admin12345'),
            ]
        );

        // 3. Profile Settings
        ProfileSetting::truncate();
        ProfileSetting::create([
            'full_name' => 'Muhammad Rafli Pradipta',
            'display_name_outline' => 'RAFLI PRADIPTA',
            'tagline' => 'Fullstack Engineer & Junior Data Analyst',
            'bio' => 'Universitas Brawijaya graduate passionate about building intuitive web experiences and analytical intelligence. Experienced in Front-End architecture, Laravel ecosystems, Machine Learning forecasting, and Business Intelligence.',
            'available_for_work' => true,
            'current_role' => 'Junior Data Analyst & Web Developer',
            'profile_cutout_path' => $profileCutoutRel,
            'email' => 'rafli.pradipta@example.com',
            'phone' => '+62 812-3456-7890',
            'location' => 'Malang / Surabaya, Indonesia',
            'github_url' => 'https://github.com/Diptaaaa',
            'linkedin_url' => 'https://linkedin.com/in/muhammad-rafli-pradipta',
            'instagram_url' => 'https://instagram.com/rafli.pradipta',
        ]);

        // 4. Projects
        Project::truncate();

        // 1. Little Lemon
        $llThumb = $copiedProjectImages['little_lemon'][0] ?? null;
        Project::create([
            'title' => 'Little Lemon Restaurant',
            'slug' => 'little-lemon-restaurant',
            'category' => 'technical',
            'is_featured' => true,
            'featured_order' => 1,
            'short_description' => 'Modern responsive restaurant web application featuring an interactive table booking system, dynamic menus, and accessibility-first UI.',
            'full_description' => 'Developed as part of the prestigious Meta Front-End Developer Professional Certification. Built with modern React architecture, robust form validation state machines, dynamic reservation schedule selection, and high-contrast responsive UX.',
            'thumbnail_path' => $llThumb,
            'gallery_images' => $copiedProjectImages['little_lemon'] ?? [],
            'tech_stack' => ['React', 'JavaScript (ES6+)', 'HTML5 / CSS3', 'Responsive Design', 'Formik / Yup', 'Unit Testing'],
            'live_demo_url' => 'https://github.com/Diptaaaa',
            'github_repo_url' => 'https://github.com/Diptaaaa',
            'year' => '2024',
            'client_or_context' => 'Meta Front-End Certification Capstone',
            'sort_order' => 1,
        ]);

        // 2. Bumi Arema
        $baThumb = $copiedProjectImages['bumi_arema'][0] ?? null;
        Project::create([
            'title' => 'Bumi Arema Tour & Travel',
            'slug' => 'bumi-arema-tour-travel',
            'category' => 'technical',
            'is_featured' => true,
            'featured_order' => 2,
            'short_description' => 'End-to-end travel booking platform and East Java tourism destination directory portal with customized booking itinerary flows.',
            'full_description' => 'A comprehensive web platform engineered for regional tourism in East Java. Integrates package booking management, destination catalogues, responsive booking confirmation, and administrative back-office management.',
            'thumbnail_path' => $baThumb,
            'gallery_images' => $copiedProjectImages['bumi_arema'] ?? [],
            'tech_stack' => ['Laravel', 'PHP', 'MySQL', 'Bootstrap 5', 'Blade', 'RESTful API'],
            'live_demo_url' => 'https://github.com/Diptaaaa',
            'github_repo_url' => 'https://github.com/Diptaaaa',
            'year' => '2024',
            'client_or_context' => 'Client Production Project',
            'sort_order' => 2,
        ]);

        // 3. Early Warning System FILKOM UB
        $ewsThumb = $copiedProjectImages['ews_filkom'][0] ?? null;
        Project::create([
            'title' => 'Early Warning System Kelulusan Mahasiswa',
            'slug' => 'early-warning-system-filkom-ub',
            'category' => 'digital',
            'is_featured' => true,
            'featured_order' => 3,
            'short_description' => 'Academic risk intelligence platform utilizing Machine Learning algorithms and Power BI to forecast graduation timelines.',
            'full_description' => 'Predictive machine learning pipeline developed for Faculty of Computer Science, Universitas Brawijaya. Analyzes historical academic progress indicators (credits passed, GPA trajectories, prerequisite completion) to detect drop-out/delayed graduation risks early.',
            'thumbnail_path' => $ewsThumb,
            'gallery_images' => $copiedProjectImages['ews_filkom'] ?? [],
            'tech_stack' => ['Power BI', 'Python', 'Machine Learning', 'Pandas', 'Scikit-Learn', 'DAX'],
            'live_demo_url' => 'https://github.com/Diptaaaa',
            'github_repo_url' => 'https://github.com/Diptaaaa',
            'year' => '2024',
            'client_or_context' => 'FILKOM Universitas Brawijaya',
            'sort_order' => 3,
        ]);

        // 4. Cyclistic Bike-Share
        $cycThumb = $copiedProjectImages['cyclistic'][0] ?? null;
        Project::create([
            'title' => 'Cyclistic Bike-Share Analysis',
            'slug' => 'cyclistic-bike-share-analysis',
            'category' => 'digital',
            'is_featured' => true,
            'featured_order' => 4,
            'short_description' => 'Large-scale behavioral data analytics case study examining usage disparities between casual riders and annual subscribers.',
            'full_description' => 'Capstone project for Google Data Analytics Professional Certificate. Processed over 5 million trip records using R and SQL, followed by high-impact interactive visualization dashboards built in Tableau.',
            'thumbnail_path' => $cycThumb,
            'gallery_images' => $copiedProjectImages['cyclistic'] ?? [],
            'tech_stack' => ['Tableau', 'R / RStudio', 'SQL', 'Data Cleansing', 'Data Storytelling'],
            'live_demo_url' => 'https://github.com/Diptaaaa',
            'github_repo_url' => 'https://github.com/Diptaaaa',
            'year' => '2023',
            'client_or_context' => 'Google Data Analytics Certificate Capstone',
            'sort_order' => 4,
        ]);

        // Archive technical & digital projects
        Project::create([
            'title' => 'Apple Foundation Academy iOS Prototype',
            'slug' => 'apple-foundation-academy-ios',
            'category' => 'technical',
            'is_featured' => false,
            'featured_order' => 0,
            'short_description' => 'Native iOS mobile solution designed and prototyped under Apple Developer Academy methodology.',
            'tech_stack' => ['Swift', 'SwiftUI', 'Human Interface Guidelines', 'Figma'],
            'year' => '2024',
            'client_or_context' => 'Apple Developer Foundation Academy',
            'sort_order' => 5,
        ]);

        Project::create([
            'title' => 'Academic GPA & Credit Analytics Service',
            'slug' => 'academic-gpa-analytics',
            'category' => 'digital',
            'is_featured' => false,
            'featured_order' => 0,
            'short_description' => 'Automated exploratory data analysis pipeline evaluating undergraduate student grade distributions.',
            'tech_stack' => ['Python', 'Seaborn', 'Matplotlib', 'Jupyter'],
            'year' => '2024',
            'client_or_context' => 'Data Research Initiative',
            'sort_order' => 6,
        ]);

        Project::create([
            'title' => 'Retail Sales & POS Forecasting Engine',
            'slug' => 'retail-pos-forecasting',
            'category' => 'digital',
            'is_featured' => false,
            'featured_order' => 0,
            'short_description' => 'Time-series forecasting model evaluating seasonal demand peaks across retail franchises.',
            'tech_stack' => ['Python', 'Statsmodels', 'SQL', 'Excel Advanced'],
            'year' => '2023',
            'client_or_context' => 'Business Case Competition',
            'sort_order' => 7,
        ]);

        Project::create([
            'title' => 'Automated Invoice & Tax Form Generator',
            'slug' => 'invoice-tax-generator',
            'category' => 'technical',
            'is_featured' => false,
            'featured_order' => 0,
            'short_description' => 'Internal tool automating invoice generation and standard receipt reconciliation for SMEs.',
            'tech_stack' => ['Laravel', 'MySQL', 'TailwindCSS', 'DomPDF'],
            'year' => '2023',
            'client_or_context' => 'Freelance Client',
            'sort_order' => 8,
        ]);

        // 5. Skills
        Skill::truncate();
        $skills = [
            // Frontend
            ['category' => 'frontend', 'name' => 'React.js', 'icon_name' => 'Code2', 'proficiency_level' => 'Advanced', 'sort_order' => 1],
            ['category' => 'frontend', 'name' => 'JavaScript (ES6+)', 'icon_name' => 'FileCode', 'proficiency_level' => 'Advanced', 'sort_order' => 2],
            ['category' => 'frontend', 'name' => 'HTML5 & Semantic Web', 'icon_name' => 'Layout', 'proficiency_level' => 'Expert', 'sort_order' => 3],
            ['category' => 'frontend', 'name' => 'CSS3 & Modern Motion', 'icon_name' => 'Sparkles', 'proficiency_level' => 'Advanced', 'sort_order' => 4],
            ['category' => 'frontend', 'name' => 'Tailwind CSS', 'icon_name' => 'Palette', 'proficiency_level' => 'Advanced', 'sort_order' => 5],
            ['category' => 'frontend', 'name' => 'Inertia.js', 'icon_name' => 'Layers', 'proficiency_level' => 'Proficient', 'sort_order' => 6],
            // Backend
            ['category' => 'backend', 'name' => 'PHP & Laravel', 'icon_name' => 'Server', 'proficiency_level' => 'Advanced', 'sort_order' => 7],
            ['category' => 'backend', 'name' => 'RESTful API Architecture', 'icon_name' => 'Network', 'proficiency_level' => 'Advanced', 'sort_order' => 8],
            ['category' => 'backend', 'name' => 'MySQL / Database Design', 'icon_name' => 'Database', 'proficiency_level' => 'Advanced', 'sort_order' => 9],
            ['category' => 'backend', 'name' => 'Node.js Basics', 'icon_name' => 'Cpu', 'proficiency_level' => 'Intermediate', 'sort_order' => 10],
            // Data & AI
            ['category' => 'data_ai', 'name' => 'Python for Data Science', 'icon_name' => 'Terminal', 'proficiency_level' => 'Advanced', 'sort_order' => 11],
            ['category' => 'data_ai', 'name' => 'Power BI & DAX', 'icon_name' => 'BarChart3', 'proficiency_level' => 'Advanced', 'sort_order' => 12],
            ['category' => 'data_ai', 'name' => 'Tableau Visualizations', 'icon_name' => 'PieChart', 'proficiency_level' => 'Advanced', 'sort_order' => 13],
            ['category' => 'data_ai', 'name' => 'SQL & Query Optimization', 'icon_name' => 'Database', 'proficiency_level' => 'Advanced', 'sort_order' => 14],
            ['category' => 'data_ai', 'name' => 'Machine Learning (Scikit-Learn)', 'icon_name' => 'Brain', 'proficiency_level' => 'Proficient', 'sort_order' => 15],
            // Tools
            ['category' => 'tools', 'name' => 'Git & GitHub Workflow', 'icon_name' => 'GitBranch', 'proficiency_level' => 'Advanced', 'sort_order' => 16],
            ['category' => 'tools', 'name' => 'Figma UI/UX Prototyping', 'icon_name' => 'Figma', 'proficiency_level' => 'Advanced', 'sort_order' => 17],
            ['category' => 'tools', 'name' => 'Vite & Modern Bundlers', 'icon_name' => 'Zap', 'proficiency_level' => 'Advanced', 'sort_order' => 18],
        ];
        foreach ($skills as $s) {
            Skill::create($s);
        }

        // 6. Trait Deck (Section About Me)
        TraitCard::truncate();
        $traits = [
            [
                'title' => 'Data-Driven Engineering',
                'tagline' => 'Decisions Backed by Quantitative Rigor',
                'description' => 'I do not just build interfaces; I measure their impact. Every architectural choice is substantiated by data insights, user interaction logs, and continuous optimization.',
                'icon_name' => 'LineChart',
                'badge_color' => '#C4A992',
                'sort_order' => 1,
            ],
            [
                'title' => 'Pixel Craft & Motion',
                'tagline' => 'Obsessive Attention to Aesthetic Detail',
                'description' => 'From 60fps micro-animations to typographic scales and fluid layout responsiveness, I craft digital products that leave a lasting emotional impression.',
                'icon_name' => 'Sparkles',
                'badge_color' => '#E8DDD5',
                'sort_order' => 2,
            ],
            [
                'title' => 'Fullstack Versatility',
                'tagline' => 'Bridging Client-Side to Server Infrastructure',
                'description' => 'Fluidly moving between React front-end components, Laravel backend APIs, SQL schemas, and machine learning models for holistic problem solving.',
                'icon_name' => 'Workflow',
                'badge_color' => '#A88D79',
                'sort_order' => 3,
            ],
            [
                'title' => 'Agile & Collaborative',
                'tagline' => 'Thriving in Multidisciplinary Squads',
                'description' => 'Sharpened through collaborative projects at Universitas Brawijaya, client deliverables, and open-source contributions.',
                'icon_name' => 'Users',
                'badge_color' => '#D1C2B8',
                'sort_order' => 4,
            ],
        ];
        foreach ($traits as $t) {
            TraitCard::create($t);
        }

        // 7. Awards
        Award::truncate();
        $awards = [
            [
                'title' => 'Meta Front-End Developer Professional Certificate',
                'institution' => 'Meta / Coursera',
                'year' => '2024',
                'description' => 'Demonstrated mastery in React, responsive user interface design, accessible web applications, and version control.',
                'type' => 'certification',
                'sort_order' => 1,
            ],
            [
                'title' => 'Google Data Analytics Professional Certificate',
                'institution' => 'Google / Coursera',
                'year' => '2023',
                'description' => 'Comprehensive certification covering data preparation, SQL analysis, R programming, and Tableau dashboards.',
                'type' => 'certification',
                'sort_order' => 2,
            ],
            [
                'title' => 'Bachelor of Computer Science / Information Technology',
                'institution' => 'Universitas Brawijaya',
                'year' => '2024',
                'description' => 'Graduated with strong foundation in Software Engineering, Machine Learning, and Information Systems.',
                'type' => 'degree',
                'sort_order' => 3,
            ],
        ];
        foreach ($awards as $a) {
            Award::create($a);
        }

        // 8. Award Photos (Documentation Collage)
        AwardPhoto::truncate();
        $rotations = [-3, 2, -1, 4, -2, 3, -4];
        foreach ($copiedAwardPhotos as $i => $item) {
            AwardPhoto::create([
                'title' => 'Milestone Moment ' . ($i + 1),
                'caption' => 'Academic & Certification Journey',
                'image_path' => $item['path'],
                'rotation_deg' => $rotations[$i % count($rotations)],
                'sort_order' => $i + 1,
            ]);
        }

        // 9. Experiences
        Experience::truncate();
        $experiences = [
            [
                'role' => 'Junior Data Analyst & Front-End Developer',
                'company_or_org' => 'Independent / Freelance',
                'period' => '2023 - Present',
                'description' => 'Developing high-conversion client web solutions and transforming operational datasets into interactive executive dashboards.',
                'type' => 'work',
                'sort_order' => 1,
            ],
            [
                'role' => 'Machine Learning & BI Researcher',
                'company_or_org' => 'Faculty of Computer Science, Universitas Brawijaya',
                'period' => '2023 - 2024',
                'description' => 'Researched and deployed predictive graduation model (Early Warning System) using Scikit-Learn and Power BI.',
                'type' => 'education',
                'sort_order' => 2,
            ],
            [
                'role' => 'Undergraduate Student',
                'company_or_org' => 'Universitas Brawijaya',
                'period' => '2020 - 2024',
                'description' => 'Completed coursework in Data Structures, Web Development, Machine Learning, and Software Architecture.',
                'type' => 'education',
                'sort_order' => 3,
            ],
        ];
        foreach ($experiences as $e) {
            Experience::create($e);
        }

        // 10. Trait Cards (What I Can Do / Traits Deck)
        TraitCard::truncate();
        $traits = [
            [
                'title' => 'Detail-Oriented',
                'tagline' => 'Precision in Every Interaction',
                'description' => 'From 60fps micro-animations to semantic accessibility and pixel-perfect design alignment.',
                'icon_name' => 'Sparkles',
                'badge_color' => 'amber',
                'sort_order' => 1,
            ],
            [
                'title' => 'Problem Solver',
                'tagline' => 'Pragmatic & Resilient Solutions',
                'description' => 'Decomposing complex systemic bottlenecks into elegant, modular, and maintainable software architectures.',
                'icon_name' => 'Code2',
                'badge_color' => 'sky',
                'sort_order' => 2,
            ],
            [
                'title' => 'Data-Driven',
                'tagline' => 'Decisions Backed by Quantitative Rigor',
                'description' => 'Leveraging data pipelines, exploratory analytics, and machine learning models for measurable impact.',
                'icon_name' => 'BarChart3',
                'badge_color' => 'emerald',
                'sort_order' => 3,
            ],
            [
                'title' => 'Continuous Learner',
                'tagline' => 'Rapid Adaptation to Modern Tech',
                'description' => 'Constantly exploring modern web frameworks, Apple ecosystem engineering, and scalable backend design.',
                'icon_name' => 'Cpu',
                'badge_color' => 'rose',
                'sort_order' => 4,
            ],
        ];
        foreach ($traits as $t) {
            TraitCard::create($t);
        }
    }
}

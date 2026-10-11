<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\Skill;
use App\Models\TraitCard;
use App\Models\Award;
use App\Models\AwardPhoto;
use App\Models\Experience;
use App\Models\ContactMessage;
use Illuminate\Support\Facades\Log;

class PortfolioController extends Controller
{
    public function index(): Response
    {
        $profile = ProfileSetting::first();
        $featuredProjects = Project::where('is_featured', true)
            ->orderBy('featured_order')
            ->get();
        
        $archiveProjects = Project::orderBy('sort_order')
            ->get();

        $skills = Skill::orderBy('sort_order')->get()->groupBy('category');
        $traits = TraitCard::orderBy('sort_order')->get();
        $awards = Award::orderBy('sort_order')->get();
        $awardPhotos = AwardPhoto::orderBy('sort_order')->get();
        $experiences = Experience::orderBy('sort_order')->get();

        return Inertia::render('Public/Index', [
            'profile' => $profile,
            'featuredProjects' => $featuredProjects,
            'archiveProjects' => $archiveProjects,
            'skills' => $skills,
            'traits' => $traits,
            'awards' => $awards,
            'awardPhotos' => $awardPhotos,
            'experiences' => $experiences,
        ]);
    }

    public function archive(): Response
    {
        $profile = ProfileSetting::first();
        $allProjects = Project::orderBy('sort_order')->get();

        $technicalProjects = Project::where(function ($query) {
                $query->where('category', 'technical')
                      ->orWhereNull('category');
            })
            ->orderBy('sort_order')
            ->get();

        $digitalProjects = Project::where('category', 'digital')
            ->orderBy('sort_order')
            ->get();

        return Inertia::render('Public/Archive', [
            'profile' => $profile,
            'projects' => $allProjects,
            'technicalProjects' => $technicalProjects,
            'digitalProjects' => $digitalProjects,
        ]);
    }

    public function contact(Request $request)
    {
        $validated = $request->validate([
            'sender_name' => 'required|string|max:100',
            'sender_email' => 'required|email|max:150',
            'subject' => 'nullable|string|max:200',
            'message' => 'required|string|max:5000',
        ]);

        $message = ContactMessage::create([
            'sender_name' => strip_tags($validated['sender_name']),
            'sender_email' => strip_tags($validated['sender_email']),
            'subject' => isset($validated['subject']) ? strip_tags($validated['subject']) : 'Portfolio Inquiry',
            'message' => strip_tags($validated['message']),
            'ip_address' => $request->ip(),
        ]);

        // Log notification for dual communication
        Log::info("New portfolio contact inquiry from {$message->sender_name} ({$message->sender_email}): {$message->subject}");

        return redirect()->back()->with('success', 'Terima kasih! Pesan Anda telah terkirim dan tersimpan.');
    }
}

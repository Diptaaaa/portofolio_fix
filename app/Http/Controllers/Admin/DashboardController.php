<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Award;
use App\Models\Experience;
use App\Models\TraitCard;
use App\Models\ContactMessage;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $profile = ProfileSetting::first();
        $stats = [
            'total_projects' => Project::count(),
            'featured_projects' => Project::where('is_featured', true)->count(),
            'total_skills' => Skill::count(),
            'total_experiences' => Experience::count(),
            'total_awards' => Award::count(),
            'total_traits' => TraitCard::count(),
            'total_messages' => ContactMessage::count(),
            'unread_messages' => ContactMessage::where('is_read', false)->count(),
        ];

        $cvPath = public_path('cv.pdf');
        $cvInfo = [
            'exists' => file_exists($cvPath),
            'url' => '/cv.pdf',
            'size_formatted' => file_exists($cvPath) ? round(filesize($cvPath) / 1024, 1) . ' KB' : null,
            'last_modified' => file_exists($cvPath) ? date('d M Y, H:i', filemtime($cvPath)) : null,
        ];

        $recentMessages = ContactMessage::latest()->take(5)->get();
        $recentProjects = Project::latest()->take(5)->get();

        return Inertia::render('Admin/Dashboard', [
            'profile' => $profile,
            'stats' => $stats,
            'cv_info' => $cvInfo,
            'recentMessages' => $recentMessages,
            'recentProjects' => $recentProjects,
        ]);
    }

    public function updateProfile(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:100',
            'display_name_outline' => 'required|string|max:100',
            'tagline' => 'required|string|max:150',
            'bio' => 'nullable|string',
            'current_role' => 'nullable|string|max:150',
            'available_for_work' => 'boolean',
            'email' => 'nullable|email|max:150',
            'phone' => 'nullable|string|max:50',
            'location' => 'nullable|string|max:100',
            'github_url' => 'nullable|url|max:255',
            'linkedin_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'cutout_photo' => 'nullable|image|max:10240',
            'cv_file' => 'nullable|file|mimes:pdf|max:15360',
        ]);

        $profile = ProfileSetting::firstOrCreate(['id' => 1]);

        if ($request->hasFile('cutout_photo')) {
            if ($profile->profile_cutout_path && Storage::disk('public')->exists($profile->profile_cutout_path)) {
                if (!str_contains($profile->profile_cutout_path, 'foto_profil.png')) {
                    Storage::disk('public')->delete($profile->profile_cutout_path);
                }
            }
            $path = $request->file('cutout_photo')->store('profile', 'public');
            $validated['profile_cutout_path'] = $path;
        }

        if ($request->hasFile('cv_file')) {
            $request->file('cv_file')->move(public_path(), 'cv.pdf');
        }

        unset($validated['cutout_photo']);
        unset($validated['cv_file']);
        $profile->update($validated);

        return redirect()->back()->with('success', 'Profil portofolio dan berkas berhasil diperbarui.');
    }

    public function toggleAvailability()
    {
        $profile = ProfileSetting::firstOrCreate(['id' => 1]);
        $profile->available_for_work = !$profile->available_for_work;
        $profile->save();

        $statusText = $profile->available_for_work ? 'Tersedia untuk Pekerjaan / Proyek' : 'Tidak Tersedia Sementara';
        return redirect()->back()->with('success', "Status ketersediaan diubah: {$statusText}");
    }
}

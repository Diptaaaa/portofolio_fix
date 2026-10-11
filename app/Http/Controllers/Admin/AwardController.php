<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Award;
use App\Models\AwardPhoto;

class AwardController extends Controller
{
    public function index(): Response
    {
        $awards = Award::orderBy('sort_order')->orderByDesc('year')->get();
        $awardPhotos = AwardPhoto::orderBy('sort_order')->get();

        $stats = [
            'total_awards' => $awards->count(),
            'certifications' => $awards->where('type', 'certification')->count(),
            'degrees' => $awards->where('type', 'degree')->count(),
            'honors' => $awards->where('type', 'honor')->count(),
            'total_photos' => $awardPhotos->count(),
        ];

        return Inertia::render('Admin/Awards/Index', [
            'awards' => $awards,
            'awardPhotos' => $awardPhotos,
            'stats' => $stats,
        ]);
    }

    public function storeAward(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'institution' => 'required|string|max:150',
            'year' => 'required|string|max:10',
            'description' => 'nullable|string',
            'type' => 'required|in:certification,degree,honor',
            'sort_order' => 'nullable|integer',
        ]);

        if (!isset($validated['sort_order']) || $validated['sort_order'] === null) {
            $maxOrder = Award::max('sort_order') ?? 0;
            $validated['sort_order'] = $maxOrder + 1;
        }

        Award::create($validated);

        return redirect()->back()->with('success', 'Sertifikat/penghargaan berhasil ditambahkan.');
    }

    public function updateAward(Request $request, Award $award)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'institution' => 'required|string|max:150',
            'year' => 'required|string|max:10',
            'description' => 'nullable|string',
            'type' => 'required|in:certification,degree,honor',
            'sort_order' => 'nullable|integer',
        ]);

        $award->update($validated);

        return redirect()->back()->with('success', 'Sertifikat/penghargaan berhasil diperbarui.');
    }

    public function destroyAward(Award $award)
    {
        $award->delete();

        return redirect()->back()->with('success', 'Sertifikat/penghargaan berhasil dihapus.');
    }

    public function storePhoto(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'caption' => 'nullable|string|max:200',
            'photo' => 'required|image|max:10240',
            'rotation_deg' => 'nullable|integer|min:-15|max:15',
            'sort_order' => 'nullable|integer',
        ]);

        $path = $request->file('photo')->store('awards', 'public');
        $validated['image_path'] = $path;
        unset($validated['photo']);

        if (!isset($validated['sort_order']) || $validated['sort_order'] === null) {
            $maxOrder = AwardPhoto::max('sort_order') ?? 0;
            $validated['sort_order'] = $maxOrder + 1;
        }

        if (!isset($validated['rotation_deg']) || $validated['rotation_deg'] === null) {
            $rotations = [-3, 2, -1, 3, -2, 4, -4];
            $count = AwardPhoto::count();
            $validated['rotation_deg'] = $rotations[$count % count($rotations)];
        }

        AwardPhoto::create($validated);

        return redirect()->back()->with('success', 'Foto kolase berhasil diunggah.');
    }

    public function updatePhoto(Request $request, AwardPhoto $awardPhoto)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:150',
            'caption' => 'nullable|string|max:200',
            'photo' => 'nullable|image|max:10240',
            'rotation_deg' => 'nullable|integer|min:-15|max:15',
            'sort_order' => 'nullable|integer',
        ]);

        if ($request->hasFile('photo')) {
            if ($awardPhoto->image_path && Storage::disk('public')->exists($awardPhoto->image_path)) {
                Storage::disk('public')->delete($awardPhoto->image_path);
            }
            $path = $request->file('photo')->store('awards', 'public');
            $validated['image_path'] = $path;
        }
        unset($validated['photo']);

        $awardPhoto->update($validated);

        return redirect()->back()->with('success', 'Foto kolase berhasil diperbarui.');
    }

    public function destroyPhoto(AwardPhoto $awardPhoto)
    {
        if ($awardPhoto->image_path && Storage::disk('public')->exists($awardPhoto->image_path)) {
            Storage::disk('public')->delete($awardPhoto->image_path);
        }

        $awardPhoto->delete();

        return redirect()->back()->with('success', 'Foto kolase berhasil dihapus.');
    }
}

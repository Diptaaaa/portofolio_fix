<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\TraitCard;

class TraitController extends Controller
{
    public function index(): Response
    {
        $traits = TraitCard::orderBy('sort_order')->get();

        $stats = [
            'total_traits' => $traits->count(),
            'colors' => $traits->pluck('badge_color')->filter()->unique()->values(),
        ];

        return Inertia::render('Admin/Traits/Index', [
            'traits' => $traits,
            'stats' => $stats,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'tagline' => 'required|string|max:150',
            'description' => 'required|string|max:500',
            'icon_name' => 'nullable|string|max:50',
            'badge_color' => 'nullable|string|max:30',
            'sort_order' => 'nullable|integer',
        ]);

        if (!isset($validated['sort_order']) || $validated['sort_order'] === null) {
            $maxOrder = TraitCard::max('sort_order') ?? 0;
            $validated['sort_order'] = $maxOrder + 1;
        }

        if (empty($validated['icon_name'])) {
            $validated['icon_name'] = 'Sparkles';
        }

        if (empty($validated['badge_color'])) {
            $validated['badge_color'] = 'amber';
        }

        TraitCard::create($validated);

        return redirect()->back()->with('success', 'Trait card berhasil ditambahkan.');
    }

    public function update(Request $request, TraitCard $trait)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:100',
            'tagline' => 'required|string|max:150',
            'description' => 'required|string|max:500',
            'icon_name' => 'nullable|string|max:50',
            'badge_color' => 'nullable|string|max:30',
            'sort_order' => 'nullable|integer',
        ]);

        if (empty($validated['icon_name'])) {
            $validated['icon_name'] = 'Sparkles';
        }

        if (empty($validated['badge_color'])) {
            $validated['badge_color'] = 'amber';
        }

        $trait->update($validated);

        return redirect()->back()->with('success', 'Trait card berhasil diperbarui.');
    }

    public function destroy(TraitCard $trait)
    {
        $trait->delete();

        return redirect()->back()->with('success', 'Trait card berhasil dihapus.');
    }
}

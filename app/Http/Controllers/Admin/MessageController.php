<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\ContactMessage;

class MessageController extends Controller
{
    public function index(): Response
    {
        $messages = ContactMessage::orderByDesc('created_at')->get();

        return Inertia::render('Admin/Messages/Index', [
            'messages' => $messages,
        ]);
    }

    public function toggleRead(ContactMessage $message)
    {
        $message->is_read = !$message->is_read;
        $message->save();

        return redirect()->back()->with('success', 'Status pesan diperbarui.');
    }

    public function destroy(ContactMessage $message)
    {
        $message->delete();
        return redirect()->back()->with('success', 'Pesan berhasil dihapus.');
    }
}

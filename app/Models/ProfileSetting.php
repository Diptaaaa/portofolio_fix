<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProfileSetting extends Model
{
    protected $guarded = [];

    protected $casts = [
        'available_for_work' => 'boolean',
    ];
}

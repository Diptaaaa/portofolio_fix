<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AwardPhoto extends Model
{
    protected $guarded = [];

    protected $casts = [
        'rotation_deg' => 'integer',
        'sort_order' => 'integer',
    ];
}

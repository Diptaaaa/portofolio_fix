<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TraitCard extends Model
{
    protected $table = 'traits';
    protected $guarded = [];

    protected $casts = [
        'sort_order' => 'integer',
    ];
}

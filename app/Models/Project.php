<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $guarded = [];

    protected $casts = [
        'is_featured' => 'boolean',
        'gallery_images' => 'array',
        'tech_stack' => 'array',
        'featured_order' => 'integer',
        'sort_order' => 'integer',
    ];
}

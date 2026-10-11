<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\ProfileSetting;

class ExampleTest extends TestCase
{
    use RefreshDatabase;

    public function test_the_application_returns_a_successful_response(): void
    {
        ProfileSetting::create([
            'full_name' => 'Muhammad Rafli Pradipta',
        ]);

        $response = $this->get('/');
        $response->assertStatus(200);
    }
}

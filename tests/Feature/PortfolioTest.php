<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\User;
use App\Models\ProfileSetting;
use App\Models\Project;
use App\Models\Skill;
use App\Models\Experience;
use App\Models\ContactMessage;
use App\Models\Award;
use App\Models\AwardPhoto;
use App\Models\TraitCard;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class PortfolioTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        ProfileSetting::create([
            'full_name' => 'Muhammad Rafli Pradipta',
            'display_name_outline' => 'RAFLI PRADIPTA',
            'tagline' => 'Fullstack Engineer & Junior Data Analyst',
            'available_for_work' => true,
        ]);

        Project::create([
            'title' => 'Little Lemon Restaurant',
            'slug' => 'little-lemon-restaurant',
            'category' => 'technical',
            'is_featured' => true,
            'featured_order' => 1,
            'short_description' => 'Test project description',
            'tech_stack' => ['React', 'CSS'],
        ]);
    }

    public function test_portfolio_home_page_returns_successful_response(): void
    {
        $response = $this->get('/');
        $response->assertStatus(200);
    }

    public function test_portfolio_archive_page_returns_successful_response(): void
    {
        $response = $this->get('/archive');
        $response->assertStatus(200);
        $response->assertSee('Little Lemon Restaurant');
    }

    public function test_visitor_can_submit_contact_message(): void
    {
        $response = $this->post('/contact', [
            'sender_name' => 'Recruiter Test',
            'sender_email' => 'recruiter@example.com',
            'subject' => 'Front-End Opportunity',
            'message' => 'We would love to discuss a front-end engineering position with you.',
        ]);

        $response->assertSessionHas('success');
        $this->assertDatabaseHas('contact_messages', [
            'sender_email' => 'recruiter@example.com',
        ]);
    }

    public function test_admin_login_page_is_accessible(): void
    {
        $response = $this->get('/admin/login');
        $response->assertStatus(200);
    }

    public function test_admin_can_login_and_access_dashboard(): void
    {
        $user = User::factory()->create([
            'email' => 'admin@rafli.dev',
            'password' => bcrypt('password123'),
        ]);

        $loginResponse = $this->post('/admin/login', [
            'email' => 'admin@rafli.dev',
            'password' => 'password123',
        ]);

        $loginResponse->assertRedirect(route('admin.dashboard'));
        $this->assertAuthenticatedAs($user);

        $dashResponse = $this->actingAs($user)->get('/admin/dashboard');
        $dashResponse->assertStatus(200);
    }

    public function test_unauthenticated_user_cannot_access_admin_dashboard(): void
    {
        $response = $this->get('/admin/dashboard');
        $response->assertRedirect('/admin/login');
    }

    public function test_admin_can_create_update_and_delete_project(): void
    {
        $user = User::factory()->create();

        $createResponse = $this->actingAs($user)->post('/admin/projects', [
            'title' => 'E-Commerce Marketplace',
            'category' => 'technical',
            'is_featured' => true,
            'featured_order' => 2,
            'short_description' => 'A scalable multivendor store with payment gateway.',
            'tech_stack' => ['Laravel', 'React', 'MySQL'],
            'live_demo_url' => 'https://example.com/store',
            'github_repo_url' => 'https://github.com/Diptaaaa/ecommerce',
            'year' => '2026',
        ]);

        $createResponse->assertSessionHas('success');
        $this->assertDatabaseHas('projects', [
            'title' => 'E-Commerce Marketplace',
            'slug' => 'e-commerce-marketplace',
        ]);

        $project = Project::where('slug', 'e-commerce-marketplace')->first();

        $deleteResponse = $this->actingAs($user)->delete("/admin/projects/{$project->id}");
        $deleteResponse->assertSessionHas('success');
        $this->assertDatabaseMissing('projects', [
            'id' => $project->id,
        ]);
    }

    public function test_admin_can_toggle_availability_and_messages(): void
    {
        $user = User::factory()->create();
        $profile = ProfileSetting::first();

        $toggleResponse = $this->actingAs($user)->post('/admin/profile/toggle-availability');
        $toggleResponse->assertSessionHas('success');
        $this->assertDatabaseHas('profile_settings', [
            'id' => $profile->id,
            'available_for_work' => false,
        ]);

        $message = ContactMessage::create([
            'sender_name' => 'John Doe',
            'sender_email' => 'john@test.com',
            'subject' => 'Hello',
            'message' => 'Great portfolio!',
            'is_read' => false,
        ]);

        $msgToggleResponse = $this->actingAs($user)->post("/admin/messages/{$message->id}/toggle-read");
        $msgToggleResponse->assertSessionHas('success');
        $this->assertDatabaseHas('contact_messages', [
            'id' => $message->id,
            'is_read' => true,
        ]);
    }

    public function test_admin_can_manage_skills(): void
    {
        $user = User::factory()->create();

        // 1. Index page
        $indexResponse = $this->actingAs($user)->get('/admin/skills');
        $indexResponse->assertStatus(200);

        // 2. Create skill
        $createResponse = $this->actingAs($user)->post('/admin/skills', [
            'name' => 'Vue.js',
            'category' => 'frontend',
            'icon_name' => 'Code2',
            'proficiency_level' => 'Proficient',
            'is_highlighted' => true,
            'sort_order' => 10,
        ]);
        $createResponse->assertSessionHas('success');
        $this->assertDatabaseHas('skills', [
            'name' => 'Vue.js',
            'category' => 'frontend',
        ]);

        $skill = Skill::where('name', 'Vue.js')->first();

        // 3. Update skill
        $updateResponse = $this->actingAs($user)->post("/admin/skills/{$skill->id}", [
            'name' => 'Vue.js 3',
            'category' => 'frontend',
            'icon_name' => 'Code2',
            'proficiency_level' => 'Advanced',
            'is_highlighted' => false,
            'sort_order' => 11,
        ]);
        $updateResponse->assertSessionHas('success');
        $this->assertDatabaseHas('skills', [
            'id' => $skill->id,
            'name' => 'Vue.js 3',
            'proficiency_level' => 'Advanced',
        ]);

        // 4. Toggle highlight
        $toggleResponse = $this->actingAs($user)->post("/admin/skills/{$skill->id}/toggle-highlight");
        $toggleResponse->assertSessionHas('success');
        $this->assertDatabaseHas('skills', [
            'id' => $skill->id,
            'is_highlighted' => true,
        ]);

        // 5. Delete skill
        $deleteResponse = $this->actingAs($user)->delete("/admin/skills/{$skill->id}");
        $deleteResponse->assertSessionHas('success');
        $this->assertDatabaseMissing('skills', [
            'id' => $skill->id,
        ]);
    }

    public function test_admin_can_manage_experiences(): void
    {
        $user = User::factory()->create();

        // 1. Index page
        $indexResponse = $this->actingAs($user)->get('/admin/experiences');
        $indexResponse->assertStatus(200);

        // 2. Create experience
        $createResponse = $this->actingAs($user)->post('/admin/experiences', [
            'role' => 'Front-End Lead',
            'company_or_org' => 'Tech Corp',
            'period' => '2024 - 2025',
            'description' => 'Led development of internal dashboard systems.',
            'type' => 'work',
            'sort_order' => 5,
        ]);
        $createResponse->assertSessionHas('success');
        $this->assertDatabaseHas('experiences', [
            'role' => 'Front-End Lead',
            'company_or_org' => 'Tech Corp',
        ]);

        $experience = Experience::where('role', 'Front-End Lead')->first();

        // 3. Update experience
        $updateResponse = $this->actingAs($user)->post("/admin/experiences/{$experience->id}", [
            'role' => 'Principal Front-End Engineer',
            'company_or_org' => 'Tech Corp Global',
            'period' => '2024 - Present',
            'description' => 'Architected modern client web apps with Next.js.',
            'type' => 'work',
            'sort_order' => 6,
        ]);
        $updateResponse->assertSessionHas('success');
        $this->assertDatabaseHas('experiences', [
            'id' => $experience->id,
            'role' => 'Principal Front-End Engineer',
            'company_or_org' => 'Tech Corp Global',
        ]);

        // 4. Delete experience
        $deleteResponse = $this->actingAs($user)->delete("/admin/experiences/{$experience->id}");
        $deleteResponse->assertSessionHas('success');
        $this->assertDatabaseMissing('experiences', [
            'id' => $experience->id,
        ]);
    }

    public function test_admin_can_manage_awards_and_photos(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();

        // 1. Index page
        $indexResponse = $this->actingAs($user)->get('/admin/awards');
        $indexResponse->assertStatus(200);

        // 2. Create award
        $createAward = $this->actingAs($user)->post('/admin/awards', [
            'title' => 'Meta Certified Front-End Developer',
            'institution' => 'Coursera & Meta',
            'year' => '2025',
            'description' => 'Comprehensive professional front-end engineering certification.',
            'type' => 'certification',
            'sort_order' => 1,
        ]);
        $createAward->assertSessionHas('success');
        $this->assertDatabaseHas('awards', [
            'title' => 'Meta Certified Front-End Developer',
            'institution' => 'Coursera & Meta',
        ]);

        $award = Award::where('title', 'Meta Certified Front-End Developer')->first();

        // 3. Update award
        $updateAward = $this->actingAs($user)->post("/admin/awards/{$award->id}", [
            'title' => 'Meta Certified Front-End Developer (Honors)',
            'institution' => 'Meta Professional',
            'year' => '2025',
            'description' => 'Updated honors certification description.',
            'type' => 'certification',
            'sort_order' => 2,
        ]);
        $updateAward->assertSessionHas('success');
        $this->assertDatabaseHas('awards', [
            'id' => $award->id,
            'title' => 'Meta Certified Front-End Developer (Honors)',
        ]);

        // 4. Create polaroid photo
        $file = UploadedFile::fake()->image('award_ceremony.jpg');
        $createPhoto = $this->actingAs($user)->post('/admin/awards/photos', [
            'title' => 'Apple Academy Graduation Day',
            'caption' => 'BSD City Cohort 2024',
            'photo' => $file,
            'rotation_deg' => 3,
            'sort_order' => 1,
        ]);
        $createPhoto->assertSessionHas('success');
        $this->assertDatabaseHas('award_photos', [
            'title' => 'Apple Academy Graduation Day',
            'caption' => 'BSD City Cohort 2024',
            'rotation_deg' => 3,
        ]);

        $photo = AwardPhoto::where('title', 'Apple Academy Graduation Day')->first();
        $this->assertNotNull($photo->image_path);
        Storage::disk('public')->assertExists($photo->image_path);

        // 5. Update photo
        $updatePhoto = $this->actingAs($user)->post("/admin/awards/photos/{$photo->id}", [
            'title' => 'Apple Academy Graduation Day - Updated',
            'caption' => 'BSD City Cohort 2024 - Gold Medalist',
            'rotation_deg' => -2,
            'sort_order' => 2,
        ]);
        $updatePhoto->assertSessionHas('success');
        $this->assertDatabaseHas('award_photos', [
            'id' => $photo->id,
            'title' => 'Apple Academy Graduation Day - Updated',
            'rotation_deg' => -2,
        ]);

        // 6. Delete photo
        $deletePhoto = $this->actingAs($user)->delete("/admin/awards/photos/{$photo->id}");
        $deletePhoto->assertSessionHas('success');
        $this->assertDatabaseMissing('award_photos', [
            'id' => $photo->id,
        ]);
        Storage::disk('public')->assertMissing($photo->image_path);

        // 7. Delete award
        $deleteAward = $this->actingAs($user)->delete("/admin/awards/{$award->id}");
        $deleteAward->assertSessionHas('success');
        $this->assertDatabaseMissing('awards', [
            'id' => $award->id,
        ]);
    }

    public function test_admin_can_manage_traits(): void
    {
        $user = User::factory()->create();

        // 1. Index page
        $indexResponse = $this->actingAs($user)->get('/admin/traits');
        $indexResponse->assertStatus(200);

        // 2. Create trait
        $createResponse = $this->actingAs($user)->post('/admin/traits', [
            'title' => 'System Architect',
            'tagline' => 'High Concurrency & Clean Design',
            'description' => 'Architecting resilient cloud-native web backends and robust database structures.',
            'icon_name' => 'Cpu',
            'badge_color' => 'indigo',
            'sort_order' => 5,
        ]);
        $createResponse->assertSessionHas('success');
        $this->assertDatabaseHas('traits', [
            'title' => 'System Architect',
            'badge_color' => 'indigo',
        ]);

        $trait = TraitCard::where('title', 'System Architect')->first();

        // 3. Update trait
        $updateResponse = $this->actingAs($user)->post("/admin/traits/{$trait->id}", [
            'title' => 'Principal System Architect',
            'tagline' => 'Scalable Multi-Tenant Platforms',
            'description' => 'Updated high performance system design description.',
            'icon_name' => 'Cpu',
            'badge_color' => 'violet',
            'sort_order' => 6,
        ]);
        $updateResponse->assertSessionHas('success');
        $this->assertDatabaseHas('traits', [
            'id' => $trait->id,
            'title' => 'Principal System Architect',
            'badge_color' => 'violet',
        ]);

        // 4. Delete trait
        $deleteResponse = $this->actingAs($user)->delete("/admin/traits/{$trait->id}");
        $deleteResponse->assertSessionHas('success');
        $this->assertDatabaseMissing('traits', [
            'id' => $trait->id,
        ]);
    }

    public function test_admin_can_update_profile_and_upload_cv_and_cutout(): void
    {
        Storage::fake('public');
        $user = User::factory()->create();
        $profile = ProfileSetting::first();

        $cutoutImage = UploadedFile::fake()->image('custom_cutout.png', 500, 700);
        $cvPdf = UploadedFile::fake()->create('custom_resume.pdf', 300, 'application/pdf');

        $response = $this->actingAs($user)->post('/admin/profile', [
            'full_name' => 'Muhammad Rafli Pradipta Updated',
            'display_name_outline' => 'RAFLI PRADIPTA PRO',
            'tagline' => 'Lead Fullstack & AI Engineer',
            'current_role' => 'Principal Software Engineer',
            'location' => 'Jakarta, Indonesia',
            'bio' => 'Passionate software craftsman.',
            'available_for_work' => true,
            'email' => 'contact@rafli.dev',
            'phone' => '+6281234567890',
            'github_url' => 'https://github.com/Diptaaaa',
            'linkedin_url' => 'https://linkedin.com/in/rafli-pradipta',
            'instagram_url' => 'https://instagram.com/diptaaaa',
            'cutout_photo' => $cutoutImage,
            'cv_file' => $cvPdf,
        ]);

        $response->assertSessionHas('success');
        $profile->refresh();

        $this->assertEquals('Muhammad Rafli Pradipta Updated', $profile->full_name);
        $this->assertEquals('RAFLI PRADIPTA PRO', $profile->display_name_outline);
        $this->assertEquals('Lead Fullstack & AI Engineer', $profile->tagline);
        $this->assertNotNull($profile->profile_cutout_path);
        Storage::disk('public')->assertExists($profile->profile_cutout_path);
        $this->assertFileExists(public_path('cv.pdf'));
    }
}




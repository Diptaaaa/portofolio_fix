<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('profile_settings', function (Blueprint $table) {
            $table->id();
            $table->string('full_name')->default('Muhammad Rafli Pradipta');
            $table->string('display_name_outline')->default('RAFLI PRADIPTA');
            $table->string('tagline')->default('Fullstack Engineer & Data Analyst');
            $table->text('bio')->nullable();
            $table->boolean('available_for_work')->default(true);
            $table->string('current_role')->default('Junior Data Analyst & Web Developer');
            $table->string('profile_cutout_path')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('location')->default('Indonesia');
            $table->string('github_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->timestamps();
        });

        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->enum('category', ['technical', 'digital'])->default('technical');
            $table->boolean('is_featured')->default(false);
            $table->integer('featured_order')->default(0);
            $table->text('short_description')->nullable();
            $table->longText('full_description')->nullable();
            $table->string('thumbnail_path')->nullable();
            $table->json('gallery_images')->nullable();
            $table->json('tech_stack')->nullable();
            $table->string('live_demo_url')->nullable();
            $table->string('github_repo_url')->nullable();
            $table->string('year')->nullable();
            $table->string('client_or_context')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->enum('category', ['frontend', 'backend', 'data_ai', 'tools'])->default('frontend');
            $table->string('name');
            $table->string('icon_name')->nullable();
            $table->string('proficiency_level')->nullable();
            $table->boolean('is_highlighted')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('traits', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('tagline');
            $table->text('description');
            $table->string('icon_name')->nullable();
            $table->string('badge_color')->nullable();
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('awards', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('institution');
            $table->string('year');
            $table->text('description')->nullable();
            $table->string('type')->default('honor');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('award_photos', function (Blueprint $table) {
            $table->id();
            $table->string('title')->nullable();
            $table->string('caption')->nullable();
            $table->string('image_path');
            $table->integer('rotation_deg')->default(0);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('role');
            $table->string('company_or_org');
            $table->string('period');
            $table->text('description')->nullable();
            $table->enum('type', ['education', 'work', 'organization'])->default('work');
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });

        Schema::create('contact_messages', function (Blueprint $table) {
            $table->id();
            $table->string('sender_name');
            $table->string('sender_email');
            $table->string('subject')->nullable();
            $table->text('message');
            $table->boolean('is_read')->default(false);
            $table->string('ip_address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_messages');
        Schema::dropIfExists('experiences');
        Schema::dropIfExists('award_photos');
        Schema::dropIfExists('awards');
        Schema::dropIfExists('traits');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('projects');
        Schema::dropIfExists('profile_settings');
    }
};

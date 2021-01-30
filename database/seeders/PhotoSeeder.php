<?php

namespace Database\Seeders;

use Illuminate\Support\Arr;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Photo;

class PhotoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $response = Http::get('http://jsonplaceholder.typicode.com/photos');
        $api_result = json_decode($response->body(), true);
        foreach ($api_result as $val) {
            // dump($val);
            Photo::create([
                'id' => Arr::get($val, 'id'),
                'album_id' => Arr::get($val, 'albumId'),
                'title' => Arr::get($val, 'title'),
                'url' => Arr::get($val, 'url'),
                'thumbnail_url' => Arr::get($val, 'thumbnailUrl'),
            ]);
        }
    }
}

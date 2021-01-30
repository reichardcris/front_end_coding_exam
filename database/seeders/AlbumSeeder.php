<?php

namespace Database\Seeders;

use Illuminate\Support\Arr;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Album;

class AlbumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $response = Http::get('http://jsonplaceholder.typicode.com/albums');
        $api_result = json_decode($response->body(), true);
        
        foreach ($api_result as $val) {
            Album::create([
                'id' => Arr::get($val, 'id'),
                'title' => Arr::get($val, 'title'),
                'user_id' => Arr::get($val, 'userId'),
            ]);
        }
    }
}

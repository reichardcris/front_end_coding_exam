<?php

namespace Database\Seeders;

use Illuminate\Support\Arr;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $response = Http::get('http://jsonplaceholder.typicode.com/users');
        $api_result = json_decode($response->body(), true);
        foreach ($api_result as $val) {
            $address = array_filter(Arr::get($val, 'address', []), function($item) {
                return !(is_array($item));
            });
            $company = implode(' ,', Arr::get($val, 'company', []));

            User::create([
                'id' => Arr::get($val, 'id'),
                'name' => Arr::get($val, 'name'),
                'username' => Arr::get($val, 'username'),
                'email' => Arr::get($val, 'email'),
                'address' => implode(' ,', $address),
                'phone' => Arr::get($val, 'phone'),
                'website' => Arr::get($val, 'website'),
                'company_name' => $company,
            ]);
        }
    }
}

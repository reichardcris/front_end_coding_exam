<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Album;
use App\Models\Photo;



class DataController extends Controller
{

    public function fetchUsers()
    {
        return User::all();
    }

    public function findAlbum(User $user)
    {
        return json_encode(
            [
                'albums' => $user->albums,
                'user' => $user
            ]
        );
    }

    public function findPhoto(Album $album)
    {
        return $album->photos;
    }

    public function deleteAlbum(User $user, Album $album)
    {
        $album->delete();
        return json_encode(
            [
                'albums' => $user->albums,
                'user' => $user
            ]
        );
    }

}

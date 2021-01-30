<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'username',
        'phone',
        'address',
        'website',
        'company_name',
    ];

    public function albums()
    {
        return $this->hasMany(Album::class);
    }

    // public function getAlbumsAttribute()
    // {
    //     return $this->albums;
    // }

    // protected $with = ['albums'];

}

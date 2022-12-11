<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    use HasFactory;
    protected $table = "unit";
    protected $primaryKey = "id_unit";
    protected $fillable = [
        "id_unit",
        "id_lembaga",
        "id_fakultas",
        "id_prodi",
        "id_struktur",
        "status",
    ];

    public $timestamps = false;
}

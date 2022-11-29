<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class sub_berkas extends Model
{
    use HasFactory;
    protected $table = "sub_berkas";
    protected $primaryKey = "id_sub_berkas";
    protected $fillable = [
        "id_sub_berkas",
        "id_kategori_berkas",
        "nama_sub_berkas",
        "create_by",
        "create_date",
        "update_by",
        "update_date",
    ];
    public $timestamps = false;
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleUsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
      
        $roleuser = [
            [
                'user_id' => "1",
                'role_id' => '1',

            ], 
            [
                'user_id' => "2",
                'role_id' => '2',
            ],
        ];
    
        \DB::table('role_user')->insert($roleuser);
    }
}

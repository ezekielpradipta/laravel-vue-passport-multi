<?php

namespace App\Claims;

use App\Models\User;
use CorBosman\Passport\AccessToken;

class AuthClaim
{
    public function handle(AccessToken $token, $next)
    {
        $user = User::find($token->getUserIdentifier());

        $token->addClaim('user', array_merge(
            $user->toArray(),
            ['roles' => $user->roles()->get()->toArray()]
        ));

        return $next($token);
    }
}

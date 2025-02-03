using api.Extensions;

namespace api.Routes;

public static class UtilisateurRoute
{
    public static RouteGroupBuilder AJouterRouteUtilisateur(this RouteGroupBuilder builder)
    {
        builder.WithOpenApi().ProducesServiceUnavailable();

        return builder;
    }
}

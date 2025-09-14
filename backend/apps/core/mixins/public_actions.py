from rest_framework.permissions import AllowAny, IsAuthenticated

class PublicActionsMixin:
    # Lista de ações que serão públicas
    public_actions = ["list", "retrieve"]

    def is_public_action(self):
        return self.action in getattr(self, "public_actions", [])

    def get_permissions(self):
        if self.is_public_action():
            return [AllowAny()]
        return super().get_permissions()

    def get_queryset(self):
        if self.is_public_action():
            return self.get_public_queryset()
        return super().get_queryset()

    def get_public_queryset(self):
        """
        Retorna o queryset para ações públicas.
        Deve ser sobrescrito na ViewSet se precisar de queryset específico.
        """
        raise NotImplementedError(
            "Você deve implementar get_public_queryset() na sua ViewSet ou sobrescrever public_actions."
        )

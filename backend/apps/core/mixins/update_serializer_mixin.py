class UpdateSerializerMixin:   
    update_serializer_class = None

    update_actions = ["update", "partial_update"]

    def is_update_action(self):
        return self.action in getattr(self, "update_actions", [])

    def get_serializer_class(self):
        if self.is_update_action() and self.update_serializer_class:
            return self.update_serializer_class
        return super().get_serializer_class()

from django.urls import path
from .views import health_check, chat_response

urlpatterns = [
    path("health/", health_check, name="health-check"),
    path("chat/", chat_response, name="chat-response"),
]

from django.urls import path
from accounts.views.auth_views import (
    RegisterView,
    LoginView,
    UserProfileView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("me/", UserProfileView.as_view(), name="current-user"),
]
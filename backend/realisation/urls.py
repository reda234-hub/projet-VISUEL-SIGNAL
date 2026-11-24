from rest_framework.routers import DefaultRouter
from .views import RealisationViewSet
router = DefaultRouter()
router.register("realisation",RealisationViewSet,basename="realisation")
urlpatterns = router.urls


from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(["GET"])
def health_check(request):
    return Response({
        "status": "success",
        "message": "AI Customer Support API is running!"
    })


@api_view(["POST"])
def chat_response(request):
    message = request.data.get("message", "")

    if not isinstance(message, str) or not message.strip():
        return Response(
            {"error": "Message is required."},
            status=400,
        )

    return Response({
        "reply": (
            f"Thanks for your message: '{message}'. "
            "This is a temporary response from the Django backend."
        )
    })

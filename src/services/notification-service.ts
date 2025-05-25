import axios from "axios";

interface PushNotificationPayload {
  to: string;
  title: string;
  body: string;
  sound?: string;
  data?: Record<string, any>;
}

export class NotificationService {
  private readonly EXPO_PUSH_URL = "https://exp.host/--/api/v2/push/send";

  async sendLowStockNotification(
    pushToken: string,
    medicationName: string,
    quantityAvailable: number
  ): Promise<void> {
    const payload: PushNotificationPayload = {
      to: `ExponentPushToken[${pushToken}]`,
      title: "⚠️ Estoque Baixo",
      body: `${medicationName} está com apenas ${quantityAvailable} unidade(s) restante(s)`,
      sound: "default",
      data: {
        type: "LOW_STOCK",
        medicationName,
        quantityAvailable,
      },
    };

    try {
      const response = await axios.post(this.EXPO_PUSH_URL, payload, {
        headers: {
          Accept: "application/json",
          "Accept-encoding": "gzip, deflate",
          "Content-Type": "application/json",
        },
      });

      if (response.data?.data?.[0]?.status === "ok") {
        console.log(`Notification sent successfully for ${medicationName}`);
      } else {
        console.error("Error sending notification:", response.data);
      }
    } catch (error) {
      console.error("Error sending push notification:", error);
    }
  }
}

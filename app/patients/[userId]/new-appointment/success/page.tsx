import RequestSuccess from "@/components/RequestSuccess";
import { getAppointment } from "@/lib/actions/appointment.actions";

const SuccessPage = async ({ searchParams, params }: SearchParamProps) => {
  const { userId } = await params;
  const appointmentId = searchParams?.appointmentId as string;
  const appointment = await getAppointment(appointmentId);

  return <RequestSuccess appointment={appointment} userId={userId} />;
};

export default SuccessPage;

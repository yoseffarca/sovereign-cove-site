// Sends a Check Availability request to the "Check Availability" form in the
// site's Wix Forms (dashboard → Forms & Submissions). Visitors are anonymous,
// so each request first gets a short-lived visitor token for this site.
const CLIENT_ID = "7c5a9498-3d00-4c89-9c13-e79fc0e000af";
const FORM_ID = "f66e656f-435b-4591-815b-8d38972ddb36";

export type AvailabilityRequest = {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  dates: string;
  guests: string;
  planner: string;
  notes: string;
};

/** Wix only accepts phone numbers as +<country><number> with no spacing. */
function toE164(raw: string): string | null {
  const t = raw.trim();
  if (!t) return null;
  const digits = t.replace(/\D/g, "");
  if (t.startsWith("+") && digits.length >= 8 && digits.length <= 15) return `+${digits}`;
  if (t.startsWith("00") && digits.length >= 10 && digits.length <= 17) return `+${digits.slice(2)}`;
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return null;
}

function fields(r: AvailabilityRequest, withPhoneField: boolean) {
  const name = r.name.trim().replace(/\s+/g, " ");
  const space = name.indexOf(" ");
  const phone = toE164(r.phone);
  const notes = [r.notes.trim()];
  // A number we can't hand to the phone field still reaches the team, in the notes.
  if (r.phone.trim() && !(withPhoneField && phone)) notes.push(`Telephone: ${r.phone.trim()}`);

  const out: Record<string, string | number> = {
    first_name_sc01: space < 0 ? name : name.slice(0, space),
    email_sc03: r.email.trim(),
    occasion_sc05: r.occasion,
    preferred_dates_sc06: r.dates.trim(),
  };
  if (space >= 0) out.last_name_sc02 = name.slice(space + 1);
  if (withPhoneField && phone) out.phone_sc04 = phone;
  const guests = Number.parseInt(r.guests, 10);
  if (Number.isFinite(guests) && guests > 0) out.estimated_guests_sc07 = guests;
  if (r.planner.trim()) out.planner_sc08 = r.planner.trim();
  const allNotes = notes.filter(Boolean).join("\n");
  if (allNotes) out.notes_sc09 = allNotes;
  return out;
}

async function post(token: string, submissions: Record<string, string | number>) {
  return fetch("https://www.wixapis.com/form-submission-service/v4/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ submission: { formId: FORM_ID, submissions } }),
  });
}

/** Resolves once Wix has stored the request; throws if it could not be stored. */
export async function sendAvailabilityRequest(r: AvailabilityRequest): Promise<void> {
  const auth = await fetch("https://www.wixapis.com/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientId: CLIENT_ID, grantType: "anonymous" }),
  });
  if (!auth.ok) throw new Error(`token ${auth.status}`);
  const { access_token: token } = (await auth.json()) as { access_token?: string };
  if (!token) throw new Error("token missing");

  let res = await post(token, fields(r, true));
  // If Wix rejects the entry (most often the phone format), resend with the
  // phone number carried in the notes instead.
  if (res.status === 400) res = await post(token, fields(r, false));
  if (!res.ok) throw new Error(`submission ${res.status}`);
  const data = (await res.json()) as { submission?: { id?: string } };
  if (!data.submission?.id) throw new Error("submission not confirmed");
}

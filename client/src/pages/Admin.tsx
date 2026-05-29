import { Link } from "wouter";
import {
  BarChart3,
  BookOpen,
  MessageSquare,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { TOURIST_COURSE_MODULES } from "@/data/touristCourse";

// ─── design tokens ─────────────────────────────────────────────────────────
const C = {
  bg: "oklch(97% 0.005 264)",
  surface: "oklch(100% 0 0)",
  border: "oklch(88% 0.01 264)",
  text: "oklch(20% 0.01 264)",
  muted: "oklch(55% 0.01 264)",
  orange: "oklch(68% 0.19 40)",
  orangeLight: "oklch(94% 0.06 40)",
  indigo: "oklch(52% 0.24 264)",
  indigoLight: "oklch(94% 0.06 264)",
  green: "oklch(58% 0.18 145)",
  greenLight: "oklch(94% 0.06 145)",
  red: "oklch(58% 0.22 25)",
  redLight: "oklch(95% 0.05 25)",
};

// ─── KPI card ──────────────────────────────────────────────────────────────
function KpiCard({
  label,
  value,
  sub,
  icon: Icon,
  accent,
  accentLight,
}: {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  accent: string;
  accentLight: string;
}) {
  return (
    <div
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: "20px 24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <p
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: C.muted,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
          }}
        >
          {label}
        </p>
        <span
          style={{
            background: accentLight,
            borderRadius: 8,
            padding: "6px 8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Icon size={16} color={accent} />
        </span>
      </div>
      <p
        style={{
          marginTop: 12,
          fontSize: 32,
          fontWeight: 900,
          color: C.text,
          lineHeight: 1,
        }}
      >
        {value}
      </p>
      {sub && (
        <p style={{ marginTop: 6, fontSize: 12, color: C.muted }}>{sub}</p>
      )}
    </div>
  );
}

// ─── lesson slug labels ────────────────────────────────────────────────────
const LESSON_LABELS: Record<number, string> = {
  1: "Airport Arrival",
  3: "Taxi & Directions",
  4: "Food & Restaurants",
  5: "Shopping",
  6: "Hotel Check-in",
  7: "Emergency",
  9: "Small Talk",
};

export default function Admin() {
  const { data: isAdmin, isLoading: checkingAdmin } =
    trpc.admin.isAdmin.useQuery();
  const { data: analytics } = trpc.admin.getPaymentAnalytics.useQuery(
    undefined,
    {
      enabled: isAdmin === true,
    }
  );
  const { data: chatData } = trpc.admin.getChatLogs.useQuery(
    { limit: 10, offset: 0 },
    { enabled: isAdmin === true }
  );
  const { data: users } = trpc.admin.getUsers.useQuery(undefined, {
    enabled: isAdmin === true,
  });
  const { data: courseAnalytics } = trpc.admin.getCourseAnalytics.useQuery(
    undefined,
    {
      enabled: isAdmin === true,
    }
  );

  if (checkingAdmin) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: C.bg,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              width: 40,
              height: 40,
              border: `3px solid ${C.border}`,
              borderTopColor: C.indigo,
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px",
            }}
          />
          <p style={{ color: C.muted, fontSize: 14 }}>Checking permissions…</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: C.bg,
        }}
      >
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 20,
            padding: 40,
            maxWidth: 380,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 40, marginBottom: 16 }}>🔒</div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: C.text }}>
            Access Denied
          </h2>
          <p style={{ marginTop: 8, color: C.muted, fontSize: 14 }}>
            You don&apos;t have permission to access the admin dashboard.
          </p>
          <Link href="/">
            <button
              style={{
                marginTop: 24,
                width: "100%",
                padding: "12px 0",
                background: C.text,
                color: "#fff",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 14,
                border: "none",
                cursor: "pointer",
              }}
            >
              Back to site
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const formatIls = (cents: number | string | null) => {
    if (!cents) return "₪0";
    const n = typeof cents === "string" ? parseFloat(cents) : cents;
    return `₪${(n / 100).toLocaleString("he-IL", { maximumFractionDigits: 0 })}`;
  };

  const maxCompletions = Math.max(
    1,
    ...(courseAnalytics?.lessonCompletions.map(l => l.completions) ?? [])
  );

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      {/* Top bar */}
      <header
        style={{
          background: C.text,
          color: "#fff",
          padding: "16px 0",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20 }}>🇹🇭</span>
            <span style={{ fontWeight: 800, fontSize: 16 }}>
              Thailand Hayom — Admin
            </span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/admin/content">
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Content
              </button>
            </Link>
            <Link href="/admin/financial">
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Financial
              </button>
            </Link>
            <Link href="/">
              <button
                style={{
                  padding: "8px 16px",
                  borderRadius: 8,
                  background: "transparent",
                  color: "rgba(255,255,255,0.6)",
                  border: "none",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                ← Site
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 24px" }}>
        {/* KPI row */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <KpiCard
            label="Revenue"
            value={formatIls(analytics?.totalRevenue ?? 0)}
            sub="All completed payments"
            icon={TrendingUp}
            accent={C.green}
            accentLight={C.greenLight}
          />
          <KpiCard
            label="Course Purchasers"
            value={courseAnalytics?.coursePurchasers ?? 0}
            sub="Tourist course + subs"
            icon={BookOpen}
            accent={C.orange}
            accentLight={C.orangeLight}
          />
          <KpiCard
            label="Registered Users"
            value={users?.length ?? 0}
            sub="All accounts"
            icon={Users}
            accent={C.indigo}
            accentLight={C.indigoLight}
          />
          <KpiCard
            label="AI Conversations"
            value={chatData?.total ?? 0}
            sub="Travel concierge chats"
            icon={MessageSquare}
            accent={C.red}
            accentLight={C.redLight}
          />
          <KpiCard
            label="Transactions"
            value={analytics?.totalTransactions ?? 0}
            sub="Stripe completed orders"
            icon={ShoppingCart}
            accent={C.muted}
            accentLight={C.border}
          />
          <KpiCard
            label="Active Learners"
            value={courseAnalytics?.totalLearners ?? 0}
            sub="Users with lesson progress"
            icon={BarChart3}
            accent={C.green}
            accentLight={C.greenLight}
          />
        </div>

        {/* Course analytics + recent purchases */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            gap: 24,
            marginBottom: 32,
          }}
        >
          {/* Lesson completion bars */}
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: 24,
            }}
          >
            <h2
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: C.text,
                marginBottom: 20,
              }}
            >
              Lesson completions
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TOURIST_COURSE_MODULES.map(module => {
                const completion = courseAnalytics?.lessonCompletions.find(
                  l => l.lessonId === module.day
                );
                const pct = completion
                  ? Math.round((completion.completions / maxCompletions) * 100)
                  : 0;
                const label = LESSON_LABELS[module.day] ?? module.titleEn;
                return (
                  <div key={module.day}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 4,
                        fontSize: 12,
                      }}
                    >
                      <span style={{ color: C.text, fontWeight: 600 }}>
                        Day {module.day} · {label}
                      </span>
                      <span style={{ color: C.muted }}>
                        {completion?.completions ?? 0}
                      </span>
                    </div>
                    <div
                      style={{
                        height: 6,
                        borderRadius: 3,
                        background: C.border,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: C.indigo,
                          borderRadius: 3,
                          transition: "width 0.4s ease",
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent purchases */}
          <div
            style={{
              background: C.surface,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: 24,
            }}
          >
            <h2
              style={{
                fontSize: 16,
                fontWeight: 800,
                color: C.text,
                marginBottom: 20,
              }}
            >
              Recent purchases
            </h2>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: 13,
                }}
              >
                <thead>
                  <tr>
                    {["Date", "Customer", "Product", "Amount", "Status"].map(
                      h => (
                        <th
                          key={h}
                          style={{
                            textAlign: "left",
                            padding: "0 12px 12px",
                            color: C.muted,
                            fontWeight: 600,
                            fontSize: 11,
                            textTransform: "uppercase",
                            letterSpacing: "0.06em",
                            borderBottom: `1px solid ${C.border}`,
                          }}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {(analytics?.recentPurchases ?? []).map(p => (
                    <tr
                      key={p.id}
                      style={{ borderBottom: `1px solid ${C.border}` }}
                    >
                      <td style={{ padding: "12px", color: C.muted }}>
                        {new Date(p.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </td>
                      <td style={{ padding: "12px" }}>
                        <div style={{ fontWeight: 600, color: C.text }}>
                          {p.customerName ?? "—"}
                        </div>
                        <div style={{ fontSize: 11, color: C.muted }}>
                          {p.customerEmail}
                        </div>
                      </td>
                      <td style={{ padding: "12px", color: C.text }}>
                        {p.productType}
                      </td>
                      <td
                        style={{
                          padding: "12px",
                          fontWeight: 700,
                          color: C.green,
                        }}
                      >
                        {formatIls(p.amount)}
                      </td>
                      <td style={{ padding: "12px" }}>
                        <span
                          style={{
                            padding: "2px 8px",
                            borderRadius: 20,
                            fontSize: 11,
                            fontWeight: 600,
                            background:
                              p.status === "completed"
                                ? C.greenLight
                                : C.orangeLight,
                            color:
                              p.status === "completed" ? C.green : C.orange,
                          }}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {!analytics?.recentPurchases?.length && (
                    <tr>
                      <td
                        colSpan={5}
                        style={{
                          padding: "24px 12px",
                          textAlign: "center",
                          color: C.muted,
                        }}
                      >
                        No purchases yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Users table */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: 24,
            marginBottom: 32,
          }}
        >
          <h2
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: C.text,
              marginBottom: 20,
            }}
          >
            Registered users
          </h2>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 13,
              }}
            >
              <thead>
                <tr>
                  {["User", "Email", "Role", "Joined"].map(h => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "0 12px 12px",
                        color: C.muted,
                        fontWeight: 600,
                        fontSize: 11,
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                        borderBottom: `1px solid ${C.border}`,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(users ?? []).slice(0, 20).map(u => (
                  <tr
                    key={u.id}
                    style={{ borderBottom: `1px solid ${C.border}` }}
                  >
                    <td style={{ padding: "12px" }}>
                      <div
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: "50%",
                          background: C.indigoLight,
                          color: C.indigo,
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: 12,
                          marginRight: 10,
                          verticalAlign: "middle",
                        }}
                      >
                        {(u.name ?? u.email ?? "?")[0].toUpperCase()}
                      </div>
                      <span style={{ fontWeight: 600, color: C.text }}>
                        {u.name ?? "—"}
                      </span>
                    </td>
                    <td style={{ padding: "12px", color: C.muted }}>
                      {u.email}
                    </td>
                    <td style={{ padding: "12px" }}>
                      <span
                        style={{
                          padding: "2px 8px",
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                          background:
                            u.role === "admin" ? C.redLight : C.border,
                          color: u.role === "admin" ? C.red : C.muted,
                        }}
                      >
                        {u.role ?? "user"}
                      </span>
                    </td>
                    <td style={{ padding: "12px", color: C.muted }}>
                      {new Date(u.createdAt).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {(users?.length ?? 0) > 20 && (
            <p style={{ marginTop: 12, fontSize: 12, color: C.muted }}>
              Showing 20 of {users?.length} users.
            </p>
          )}
        </div>

        {/* Chat logs */}
        <div
          style={{
            background: C.surface,
            border: `1px solid ${C.border}`,
            borderRadius: 16,
            padding: 24,
          }}
        >
          <h2
            style={{
              fontSize: 16,
              fontWeight: 800,
              color: C.text,
              marginBottom: 20,
            }}
          >
            Recent AI conversations
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {(chatData?.logs ?? []).map(log => (
              <div
                key={log.id}
                style={{
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: 16,
                  background: C.bg,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10,
                    fontSize: 11,
                    color: C.muted,
                  }}
                >
                  <span>{new Date(log.createdAt).toLocaleString("en-GB")}</span>
                  <span>Session {log.sessionId.slice(0, 8)}</span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.indigo,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    User
                  </span>
                  <p
                    style={{
                      marginTop: 4,
                      fontSize: 13,
                      color: C.text,
                      background: C.indigoLight,
                      borderRadius: 8,
                      padding: "8px 12px",
                    }}
                  >
                    {log.userMessage}
                  </p>
                </div>
                <div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: C.green,
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Assistant
                  </span>
                  <p
                    style={{
                      marginTop: 4,
                      fontSize: 13,
                      color: C.text,
                      background: C.greenLight,
                      borderRadius: 8,
                      padding: "8px 12px",
                    }}
                  >
                    {log.assistantMessage.slice(0, 300)}
                    {log.assistantMessage.length > 300 ? "…" : ""}
                  </p>
                </div>
              </div>
            ))}
            {!chatData?.logs?.length && (
              <p
                style={{
                  textAlign: "center",
                  color: C.muted,
                  padding: "24px 0",
                }}
              >
                No conversations yet
              </p>
            )}
          </div>
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

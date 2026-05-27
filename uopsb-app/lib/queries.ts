import { PoolClient } from "pg";

export async function getAllUserSessions(userId: string, client: PoolClient) {
  try {
    const query = `
    SELECT
    s.start_hour,
    s.end_hour,
    s.date,
    s.status,
    s.id as session_id,
    ss.is_requester as is_user_request,
    ss.rating as rating,
    ss.feedback as feedback,
    ss_other.user_id as partner_id,
    ss_other.rating as partner_rating,
    ss_other.feedback as partner_feedback,
    u.email,
    u.given_name,
    u.family_name,
    u.picture,
    c.course_code,
    c.name as course_name,
    t.topic_name as topic_name,
    sc.confidence_value as partner_confidence
  FROM
    session s
    LEFT JOIN topic t ON s.topic_id = t.topic_id
    INNER JOIN student_session ss ON s.id = ss.session_id
    INNER JOIN student_session ss_other ON s.id = ss_other.session_id AND ss_other.user_id != ss.user_id
    INNER JOIN student u ON ss_other.user_id = u.id
    INNER JOIN course c ON u.course_code = c.course_code
    LEFT JOIN student_confidence sc ON sc.user_id = u.id AND sc.topic_id = t.topic_id
  WHERE
    ss.user_id = $1;`;
    const result = await client.query(query, [userId]);
    return result.rows;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

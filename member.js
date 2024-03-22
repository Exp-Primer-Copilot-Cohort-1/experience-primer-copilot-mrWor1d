function skillsMember (member) {
  const user = member.user
  const memberSkills = member.skills
  const skills = memberSkills.map((skill) => {
    return {
      name: skill.name,
      level: skill.level
    }
  })
  return {
    id: user.id,
    username: user.username,
    skills: skills
  }
}
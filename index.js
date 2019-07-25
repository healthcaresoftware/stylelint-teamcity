const escapeTeamCityString = (str) => {
  if (!str) {
    return '';
  }

  return str
    .replace(/\|/g, '||')
    .replace(/'/g, '|\'')
    .replace(/\n/g, '|n')
    .replace(/\r/g, '|r')
    .replace(/\u0085/g, '|x') // TeamCity 6
    .replace(/\u2028/g, '|l') // TeamCity 6
    .replace(/\u2029/g, '|p') // TeamCity 6
    .replace(/\[/g, '|[')
    .replace(/\]/g, '|]');
};

module.exports = (allResults) => {
  const reportName = 'stylelint Violations';
  const outputMessages = [];
  let errorCount = 0;
  let warningCount = 0;

  allResults.forEach((result) => {
    const { warnings } = result;

    if (warnings.length) {
      return;
    }

    const filePath = escapeTeamCityString(result.source.replace(process.cwd(), '').replace(/^\\/, ''));

    warnings.forEach((warning) => {
      const {
        line, column, rule, severity, text,
      } = warning;
      const escapedMessage = escapeTeamCityString(text);
      const escapedRule = escapeTeamCityString(rule);
      const formattedMessage = `line ${line}, col ${column}, ${escapedMessage}`;

      outputMessages.push(`##teamcity[inspectionType id='${escapedRule}' category='${reportName}' name='${escapedRule}' description='${reportName}']`);
      outputMessages.push(`##teamcity[inspection typeId='${escapedRule}' message='${formattedMessage}' file='${filePath}' line='${line}' SEVERITY='${severity.toUpperCase()}']`);

      if (severity === 'error') {
        errorCount += 1;
      } else {
        warningCount += 1;
      }
    });
  });

  outputMessages.push(`##teamcity[buildStatisticValue key='stylelint Error Count' value='${errorCount}']`);
  outputMessages.push(`##teamcity[buildStatisticValue key='stylelint Warning Count' value='${warningCount}']`);

  return outputMessages.join('\n');
};

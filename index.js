class GithubIssueUrl {
	constructor({ repositoryUrl = '', user = '', repository = '', type = 'title', body }) {
		this.repositoryUrl = repositoryUrl
		this.repository = repository
		this.user = user
		this.type = type
		this.body = body
	}

	isValidType(type, cb) {
		const types = [
			'body',
			'title',
			'labels',
			'template',
			'milestone',
			'assignee',
			'projects'
		]

		return cb(types.find(t => t === type))
	}

	get issueUrl() {

		const url = new URL(this.repositoryUrl ? `${this.repositoryUrl}/issues/new` : `https://github.com/${this.user}/${this.repository}/issues/new`)

		this.isValidType(this.type, (name) => {
			if (name === 'labels' || name === 'projects') {
				if (!Array.isArray(this.body)) {
					throw new TypeError(`The \`${name}\` option should be an array`)
				}

				url.searchParams.set(this.type, this.body.join(','))
			}

			url.searchParams.set(this.type, this.body)
		})

		return url.toString()
	}
}

module.exports = GithubIssueUrl

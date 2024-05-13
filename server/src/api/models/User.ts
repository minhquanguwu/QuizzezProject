import mongoose, {
	model,
	Schema,
	SchemaDefinitionProperty,
	SchemaOptions,
} from 'mongoose';

const userSchema: Schema = new Schema({
	_id: {
		type: mongoose.Types.ObjectId,
	},
	name: {
		type: String,
		required: true,
		unique: false,
	} as SchemaDefinitionProperty,
	username: {
		type: String,
		required: true,
		unique: true,
	} as SchemaDefinitionProperty,
	password: {
		type: String,
		required: true,
	} as SchemaDefinitionProperty,
});

export const UserModel = model('User', userSchema);

export default class User {
	private id: string;
	private name: string;
	private username: string;
	private password: string;
	public constructor(id: string);
	public constructor(name: string, username: string, password: string);
	public constructor(...args: any[]) {
		if (args.length == 3) {
			const [name, username, password] = [...args];
			this.name = name;
			this.username = username;
			this.password = password;
			return;
		}
		if (args.length == 1) {
			const [id] = [...args];
			this.id = id;
			return;
		}
	}

	public getId(): string {
		return this.id;
	}

	public getName(): string {
		return this.name;
	}

	public setName(name: string): void {
		this.name = name;
	}

	public getUsername(): string {
		return this.username;
	}

	public setUsername(username: string): void {
		this.username = username;
	}

	public getPassword(): string {
		return this.password;
	}

	public setPassword(password: string): void {
		this.password = password;
	}
}

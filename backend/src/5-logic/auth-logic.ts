
import cyber from "../2-utils/cyber";
import { CredentialsModel, ICredentials } from "../4-models/credentials-model";
import { UnauthorizedError, ValidationError } from "../4-models/error-models";
import Role from "../4-models/role-model";
import { IUserModel, UserModel } from "../4-models/user-model";


// register step-1: partial Validation
async function registerStep1(user: IUserModel): Promise<boolean> {

    const errors = user.validateSync(["userIdNumber", "email", "password"])
    if (errors) {
        throw new ValidationError(errors.message)
    }

    const checkUserIdNumber = await UserModel.find({ userIdNumber: user.userIdNumber }).count();
    if (checkUserIdNumber > 0) {
        throw new UnauthorizedError("ID already taken")
    }

    return true
}

// register step-2
async function registerStep2(user: IUserModel): Promise<string> {

    user.role = Role.Client;

    const errors = user.validateSync();
    if (errors) {
        throw new ValidationError(errors.message)
    };

    await user.save()

    await user.updateOne({ userIdNumber: user.userIdNumber, $set: { password: cyber.hash(user.password) } }) // Hash password before saving in db:

    // Delete password  before returning
    user.$set({ password: undefined });

    // Generate token:
    const token = cyber.getNewToken(user);

    return token
};

// login
async function login(credentials: ICredentials): Promise<string> {

    const errorsValidate = credentials.validateSync();

    // Hash password before comparing to db:
    const hashPassword = cyber.hash(credentials.password)

    const userDetails = await CredentialsModel.find({ email: credentials.email }).exec();
    const user = new UserModel(userDetails[0]);

    const verifyCredentials = user.email === credentials.email && user.password === hashPassword

    if (errorsValidate || !verifyCredentials) {
        throw new UnauthorizedError("Incorrect username or password Please try again")
    };

    // Delete password  before returning
    user.$set({ password: undefined });

    const token = cyber.getNewToken(user);

    return token

}

export default {
    registerStep2,
    registerStep1,
    login
}
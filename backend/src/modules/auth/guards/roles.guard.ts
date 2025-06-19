import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator'; // Assurez-vous que roles.decorator.ts existera et sera complété

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>(
      Roles,
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    // Ici, vous devrez implémenter la logique pour vérifier les rôles de l'utilisateur
    // Par exemple : return requiredRoles.some((role) => user.roles.includes(role));
    return (
      user &&
      user.roles &&
      requiredRoles.some((role) => user.roles.includes(role))
    ); // Exemple de logique
  }
}

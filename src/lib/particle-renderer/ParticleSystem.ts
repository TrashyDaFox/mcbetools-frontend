export interface Particle {
    currentLife: number;
    totalLife: number;
    textureId: string;
    x: number;
    y: number;
    startPosX: number;
    startPosY: number;
    vx: number;
    vy: number;
    radialAccel: number;
    tangentialAccel: number;
    radius: number;
    deltaRadius: number;
    angle: number;
    degreesPerSecond: number;
    size: number;
    sizeDelta: number;
    spin: number;
    spinDelta: number;
    r: number;
    rDelta: number;
    g: number;
    gDelta: number;
    b: number;
    bDelta: number;
    a: number;
    aDelta: number;
}

export class ParticleSystem {
    particles: Particle[] = [];
    parsed: any = {};
    private emitCounter = 0;

    constructor(private indexes: string[]) {}

    parse(str: string) {
        const parts = str.split("a");
        const res: any = {};
        for (let i = 0; i < this.indexes.length; i++) {
            const key = this.indexes[i];
            const val = parseFloat(parts[i] || "0");
            if (key.endsWith("Var")) {
                const baseKey = key.replace("Var", "");
                res[baseKey] = { base: res[baseKey], variance: val };
            } else {
                res[key] = val;
            }
        }
        this.parsed = res;
    }

    private getVal(v: any) {
        return (v && typeof v === "object") 
            ? v.base + v.variance * (Math.random() * 2 - 1) 
            : (v || 0);
    }

    update(dt: number, offX: number, offY: number) {
        if (this.parsed.emission > 0) {
            const rate = 1.0 / this.parsed.emission;
            this.emitCounter += dt;
            while (this.emitCounter > rate) {
                if (this.particles.length < this.parsed.maxParticles) {
                    this.particles.push(this.spawn(offX, offY));
                }
                this.emitCounter -= rate;
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.currentLife -= dt;

            if (p.currentLife <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            if (this.parsed.mode === 0) {
                let radialX = 0, radialY = 0;
                let tangentialX = 0, tangentialY = 0;

                if (p.x !== 0 || p.y !== 0) {
                    const mag = Math.sqrt(p.x * p.x + p.y * p.y);
                    radialX = p.x / mag;
                    radialY = p.y / mag;
                }
                tangentialX = radialX;
                tangentialY = radialY;

                radialX *= p.radialAccel;
                radialY *= p.radialAccel;

                const oldX = tangentialX;
                tangentialX = -tangentialY * p.tangentialAccel;
                tangentialY = oldX * p.tangentialAccel;

                p.vx += (radialX + tangentialX + (this.parsed.gravityX || 0)) * dt;
                p.vy += (radialY + tangentialY + (this.parsed.gravityY || 0)) * dt;
                
                p.x += p.vx * dt;
                p.y += p.vy * dt;
            } 
            else {
                p.angle += p.degreesPerSecond * dt;
                p.radius += p.deltaRadius * dt;
                p.x = -Math.cos(p.angle) * p.radius;
                p.y = -Math.sin(p.angle) * p.radius;
            }

            p.size = Math.max(0, p.size + p.sizeDelta * dt);
            p.spin += p.spinDelta * dt;
            p.r += p.rDelta * dt;
            p.g += p.gDelta * dt;
            p.b += p.bDelta * dt;
            p.a += p.aDelta * dt;
        }
    }

    private spawn(offX: number, offY: number): Particle {
        const life = Math.max(0.01, this.getVal(this.parsed.lifetime));
        const angle = (this.getVal(this.parsed.angle) * Math.PI) / 180;
        const speed = this.getVal(this.parsed.speed);

        const p: any = {
            currentLife: life,
            totalLife: life,
            textureId: (this.parsed.texture || 0).toString(),
            x: this.getVal({ base: 0, variance: this.parsed.posvarX }) + offX,
            y: this.getVal({ base: 0, variance: this.parsed.posvarY }) + offY,
            startPosX: offX,
            startPosY: offY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.max(0, this.getVal(this.parsed.startSize)),
            sizeDelta: (this.getVal(this.parsed.endSize) - this.getVal(this.parsed.startSize)) / life,
            spin: this.getVal(this.parsed.startSpin),
            spinDelta: (this.getVal(this.parsed.endSpin) - this.getVal(this.parsed.startSpin)) / life,
            r: this.getVal(this.parsed.startR),
            rDelta: (this.getVal(this.parsed.endR) - this.getVal(this.parsed.startR)) / life,
            g: this.getVal(this.parsed.startG),
            gDelta: (this.getVal(this.parsed.endG) - this.getVal(this.parsed.startG)) / life,
            b: this.getVal(this.parsed.startB),
            bDelta: (this.getVal(this.parsed.endB) - this.getVal(this.parsed.startB)) / life,
            a: this.getVal(this.parsed.startA),
            aDelta: (this.getVal(this.parsed.endA) - this.getVal(this.parsed.startA)) / life
        };

        if (this.parsed.mode === 0) {
            p.radialAccel = this.getVal(this.parsed.accelRad);
            p.tangentialAccel = this.getVal(this.parsed.accelTan);
        } else {
            p.radius = this.getVal(this.parsed.startRad);
            const endRad = this.getVal(this.parsed.endRad);
            p.deltaRadius = (endRad - p.radius) / life;
            p.angle = angle;
            p.degreesPerSecond = (this.getVal(this.parsed.rotSec) * Math.PI) / 180;
        }

        return p;
    }
}